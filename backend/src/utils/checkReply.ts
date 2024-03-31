import Imap from 'node-imap';
import { simpleParser } from 'mailparser';
import { CallbackQuery } from 'node-telegram-bot-api';
import { sendEmail } from './sendEmail';
import { keyboardForOpeningBot } from '../system/keyboards';
import { moviesMirrorType } from '../types/types';
import { bot } from '../system/settings/botInit';
import {
    senderEmail,
    senderPassword,
    kinolandEmail,
    hdrezkaEmail
} from '../config/config';

let RECIPENT_EMAIL = '';

// Функция проверки ответного письма
export async function checkReply(query: CallbackQuery | undefined , mirrorType?: moviesMirrorType) {
    
    if (!query || !query.message) {
        console.error('Некорректный запрос query для replyCheck');
        return;
    }

    if (!mirrorType) {
        console.error('mirrorType == undefiend в функции replyCheck');
        return;
    }

    const chatId = query.message.chat.id;
    const loadingMessage = await bot.sendMessage(chatId, 'Загрузка...');

    if (mirrorType === 'kinoland') {
        RECIPENT_EMAIL = kinolandEmail;
    }

    if (mirrorType === 'hdrezka') {
        RECIPENT_EMAIL = hdrezkaEmail;
    }

    const imap = new Imap({
        user: senderEmail,
        password: senderPassword,
        host: 'imap.yandex.ru',
        port: 993,
        tls: true
    });

    imap.once('ready', async () => {
        getLastEmailFromSender(imap, async (emailText) => {

            try {
                // Удаляем текущее сообщение
                await bot.deleteMessage(chatId, loadingMessage.message_id);
            } catch (error: any) {
                console.error('Ошибка при удалении сообщения:', error.message);
                await sendEmail('feedback', undefined, `Произошла ошибка при стандартном удалении собщений ботом: ${error.message}`);
            }
            let value = extractPersonalLink(emailText, mirrorType);
            await bot.sendMessage(
                chatId,
                `Последний ссыль на ${mirrorType}: ${value}`,
                keyboardForOpeningBot
            );
        });
    });

    imap.connect();
}

// Функция получения последнего письма от отправителя
const getLastEmailFromSender = (imap: Imap, callback: (emailText: string) => Promise<void>) => {
    imap.openBox('INBOX', false, () => {
        const searchCriteria = [['FROM', RECIPENT_EMAIL]];
        imap.search(searchCriteria, async (err, results) => {
            if (err) {
                await sendEmail('feedback', undefined, `Произошла ошибка во время проверки (запрос на получение в replyCheck) последнего письма от отправителя`);
                throw err;
            }

            if (results.length > 0) {
                const lastSeqno = results[results.length - 1]; // Получаем последний элемент (последнее письмо)
                const fetch = imap.fetch(lastSeqno, { bodies: '' });
                fetch.on('message', (msg) => {
                    msg.on('body', async (stream: any, info) => {
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

// Функция для поиска и возврата актуального лика на сайт
function extractPersonalLink(emailText: string, mirrorType: moviesMirrorType): string {
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
    sendEmail('error', undefined);
    return ' отсутствует (ошибка извлечения линка). Репорт отправлен разработчику бота'; // Если текст не найден
}
