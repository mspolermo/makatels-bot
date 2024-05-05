import TelegramBot from 'node-telegram-bot-api';

import {telegramToken } from './src/config/config';
import { MenuResponseFactory } from './src/infrastructure/menuResponseFactory/menuResponseFactory';

const bot: TelegramBot = new TelegramBot(telegramToken, { polling: true });
const botHandler = new MenuResponseFactory(bot);

process.on('uncaughtException', botHandler.handleUncaughtException);
process.on('unhandledRejection', botHandler.handleUnhandledRejection);

bot.on('message', botHandler.handleMessage.bind(botHandler));
bot.on('callback_query', botHandler.handleCallbackQuery.bind(botHandler));
