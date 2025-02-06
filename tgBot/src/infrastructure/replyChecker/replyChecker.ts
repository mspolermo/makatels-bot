import TelegramBot from 'node-telegram-bot-api';
import Imap from 'node-imap';
import { simpleParser } from 'mailparser';

import { EmailSender } from '../emailSender/emailSender';
import { moviesMirrorModel } from '../../core/model/MoviesMirrorModel/MoviesMirrorModel';
import mainKeyboard from '../../core/services/MainKeyboards/MainKeyboards';
import { 
    senderEmail,
    senderPassword,
    kinolandEmail,
    hdrezkaEmail
} from '../../config/config';

export class ReplyChecker {
    private bot: TelegramBot;
    private imap: Imap;

    private recipientEmail: string = kinolandEmail;
    private mirrorType: moviesMirrorModel = 'hdrezka';

    private emailSender: EmailSender;

    constructor(commonBot: TelegramBot) {
        this.bot = commonBot;
        // if (typeof this.bot.sendMessage !== 'function') {
        //     throw new Error('Invalid bot object: sendMessage method is missing.');
        // }
        this.imap = new Imap({
            user: senderEmail,
            password: senderPassword,
            host: 'imap.yandex.ru',
            port: 993,
            tls: true
        });
        this.emailSender = new EmailSender();
    }

    // Метод проверки ответного письма
    public async checkReply(chatId: number, mirrorType: moviesMirrorModel): Promise<void> {
        this.recipientUpdate(mirrorType);
        const loadingMessage = await this.bot.sendMessage(chatId, 'Загрузка...'); // Используем свойство bot для отправки сообщения

        this.imap.once('ready', async () => {
            await this.getLastEmailFromSender(async (emailText: string) => {
                try {
                    await this.bot.deleteMessage(chatId, loadingMessage.message_id); // Используем свойство bot для удаления сообщения
                } catch (error: any) {
                    console.error('Ошибка при удалении сообщения:', error.message);
                    await this.emailSender.sendEmail('feedback', undefined, `Произошла ошибка при стандартном удалении собщений ботом: ${error.message}`);
                }
                // Костыль, потому-что kinoland больше не шлют сообщений на почту
                let value = mirrorType === 'hdrezka' ? this.extractPersonalLink(emailText) : 'http://kinoland.biz';
                await this.bot.sendMessage(
                    chatId,
                    `Последний ссыль на ${this.mirrorType}: ${value}`,
                    mainKeyboard.getKeyboard()
                );
            });
        });

        this.imap.connect();
    }

    // Метод обновления адресата письма в зависимости от типа выбранного зеркало
    private recipientUpdate(mirrorType: moviesMirrorModel): void {
        this.mirrorType = mirrorType;
        this.recipientEmail = this.mirrorType === 'kinoland' ? kinolandEmail : hdrezkaEmail;
    }

    // Метод получения последнего письма от отправителя
    private async getLastEmailFromSender(callback: (emailText: string) => void): Promise<void> {
        this.imap.openBox('INBOX', false, async () => {
            const searchCriteria = [['FROM', this.recipientEmail]];
            this.imap.search(searchCriteria, async (err, results) => {
                if (err) {
                    await this.emailSender.sendEmail('feedback', undefined, `Произошла ошибка во время проверки (запрос на получение в replyCheck) последнего письма от отправителя`);
                    throw err;
                }

                if (results.length > 0) {
                    const lastSeqno = results[results.length - 1];
                    const fetch = this.imap.fetch(lastSeqno, { bodies: '' });
                    fetch.on('message', async (msg) => {
                        msg.on('body', async (stream:any, info) => {
                            const email = await simpleParser(stream);
                            const emailText = email.text || 'Текст письма не найден.';
                            callback(emailText);
                        });
                    });

                    fetch.on('end', () => {
                        this.imap.end();
                    });
                } else {
                    callback('Письма от отправителя не найдены.');
                    this.imap.end();
                }
            });
        });
    }

    // Метод для поиска и возврата актуального лика на сайт
    private extractPersonalLink(emailText: string): string {
        const startIndex = emailText.indexOf(':');
        let endIndex;
        if (startIndex !== -1) {
            const restOfString = emailText.substring(startIndex + 2);
            if (this.mirrorType === 'kinoland') {
                endIndex = restOfString.indexOf('[');
            }
            if (this.mirrorType === 'hdrezka') {
                endIndex = restOfString.indexOf('\n');
            }

            if (endIndex !== -1) {
                return restOfString.substring(0, endIndex).trim();
            }
        }
        this.emailSender.sendEmail('error', undefined);
        return ' отсутствует (ошибка извлечения линка). Репорт отправлен разработчику бота';
    }
}
