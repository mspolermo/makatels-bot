import { InlineKeyboardMarkup } from 'node-telegram-bot-api';

export interface BotAnswer {
    caption: string;
    reply_markup: InlineKeyboardMarkup;
}