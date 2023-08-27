import Imap from 'node-imap';
import { simpleParser } from 'mailparser';
import { bot } from './getBot.js';
import {
    senderEmail,
    senderPassword,
    recipientEmail
} from '../config/config.js';

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
export function replyCheck (chatId) {
    
    const imap = new Imap({
        user: senderEmail,
        password: senderPassword,
        host: 'imap.yandex.ru',
        port: 993,
        tls: true
    });

    imap.once('ready', () => {
        getLastEmailFromSender(imap, (emailText) => {
            bot.sendMessage(chatId, `Последний ссыль: \n\n${emailText}`);
        });
    });

    imap.connect();
};