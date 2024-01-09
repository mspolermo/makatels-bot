import Imap from 'node-imap';
import { simpleParser } from 'mailparser';
import { bot } from './getBot.js';
import {
    senderEmail,
    senderPassword,
    kinolandEmail,
    hdrezkaEmail
} from '../config/config.js';
import { sendEmail } from './sendEmail.js';

let recipientEmail = '';

// Функция для поиска и возврата актуального лика на сайт
function extractPersonalLink(emailText, mirrorType) {
    const startIndex = emailText.indexOf(':');
    let endIndex;
    if (startIndex !== -1) {
        const restOfString = emailText.substring(startIndex + 2); // Получаем текст после ":"
        if (mirrorType === 'kinoland') {
            endIndex = restOfString.indexOf('[');
        }
        if (mirrorType === 'hdrezka') {
            endIndex = restOfString.indexOf('\n');
        }

        if (endIndex !== -1) {
            return restOfString.substring(0, endIndex).trim(); // Извлекаем текст
        }
    }
    sendEmail('error', 'null')
    return ' отсутствует (ошибка извлечения линка). Репорт отправлен разработчику бота'; // Если текст не найден
}

// Функция получения последнего письма от отправителя
const getLastEmailFromSender = (imap, callback) => {
    imap.openBox('INBOX', false, () => {
        const searchCriteria = [['FROM', recipientEmail]];
        imap.search(searchCriteria, (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                const lastSeqno = results[results.length - 1]; // Получаем последний элемент (последнее письмо)
                const fetch = imap.fetch(lastSeqno, { bodies: '' });
                fetch.on('message', (msg) => {
                    msg.on('body', async (stream, info) => {
                        const email = await simpleParser(stream);
                        const emailText = email.text || 'Текст письма не найден.';
                        callback(emailText);
                    });
                });

                fetch.on('end', () => {
                    imap.end();
                });
            } else {
                callback('Письма от отправителя не найдены.');
                imap.end();
            }
        });
    });
};

// Функция проверки ответного письма
export function replyCheck (chatId, mirrorType ) {
    
    if (mirrorType === 'kinoland') {
        recipientEmail = kinolandEmail;
    }

    if (mirrorType === 'hdrezka') {
        recipientEmail = hdrezkaEmail;
    }
    
    const imap = new Imap({
        user: senderEmail,
        password: senderPassword,
        host: 'imap.yandex.ru',
        port: 993,
        tls: true
    });

    imap.once('ready', () => {
        getLastEmailFromSender(imap, (emailText) => {
            let value = extractPersonalLink(emailText, mirrorType);
            bot.sendMessage(chatId, `Последний ссыль на ${mirrorType}: ${value}`);
        });
    });

    imap.connect();
};