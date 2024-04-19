import Imap from 'node-imap';
import { simpleParser } from 'mailparser';
import { bot } from '../system/settings/botInit';
import { keyboardForOpeningBot } from '../system/keyboards';
import { moviesMirrorType } from '../types/types';
import { 
    senderEmail,
    senderPassword,
    kinolandEmail,
    hdrezkaEmail
 } from '../config/config';
import { EmailSender } from './emailSender';

// Класс для проверки ответного письма
export class ReplyChecker {
    private imap: Imap;
    private recipientEmail: string;

    constructor(private chatId: number, private mirrorType?: moviesMirrorType) {
        this.imap = new Imap({
            user: senderEmail,
            password: senderPassword,
            host: 'imap.yandex.ru',
            port: 993,
            tls: true
        });

        this.recipientEmail = this.mirrorType === 'kinoland' ? kinolandEmail : hdrezkaEmail;
    }

    public async checkReply(): Promise<void> {
        if (!this.mirrorType) {
            console.error('mirrorType == undefined в функции replyCheck');
            return;
        }

        const loadingMessage = await bot.sendMessage(this.chatId, 'Загрузка...');

        this.imap.once('ready', async () => {
            await this.getLastEmailFromSender(async (emailText: string) => {
                try {
                    await bot.deleteMessage(this.chatId, loadingMessage.message_id);
                } catch (error: any) {
                    console.error('Ошибка при удалении сообщения:', error.message);
                    await (new EmailSender).sendEmail('feedback', undefined, `Произошла ошибка при стандартном удалении собщений ботом: ${error.message}`);
                }
                let value = this.extractPersonalLink(emailText);
                await bot.sendMessage(
                    this.chatId,
                    `Последний ссыль на ${this.mirrorType}: ${value}`,
                    keyboardForOpeningBot
                );
            });
        });

        this.imap.connect();
    }

    private async getLastEmailFromSender(callback: (emailText: string) => void): Promise<void> {
        this.imap.openBox('INBOX', false, async () => {
            const searchCriteria = [['FROM', this.recipientEmail]];
            this.imap.search(searchCriteria, async (err, results) => {
                if (err) {
                    await (new EmailSender).sendEmail('feedback', undefined, `Произошла ошибка во время проверки (запрос на получение в replyCheck) последнего письма от отправителя`);
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
        (new EmailSender).sendEmail('error', undefined);
        return ' отсутствует (ошибка извлечения линка). Репорт отправлен разработчику бота';
    }
}