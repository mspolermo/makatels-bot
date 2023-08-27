import TelegramBot from 'node-telegram-bot-api';
import { telegramToken } from '../config/config.js';

export const bot = new TelegramBot(telegramToken, { polling: true });