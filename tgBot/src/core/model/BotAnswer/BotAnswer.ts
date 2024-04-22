import { InlineKeyboardMarkup } from 'node-telegram-bot-api';

// Модель сообщений бота (заголовок с инлайн клавиатурой)

export class BotAnswer {
    constructor(
        readonly caption: string,
        readonly reply_markup: InlineKeyboardMarkup,
    ) {}
}
