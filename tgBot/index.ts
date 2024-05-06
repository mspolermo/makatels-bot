import TelegramBot from 'node-telegram-bot-api';

import {telegramToken } from './src/config/config';
import { MenuResponseFactory } from './src/infrastructure/menuResponseFactory/menuResponseFactory';
import { BotStateManager } from './src/core/services/BotStateManager/BotStateManager';

const bot: TelegramBot = new TelegramBot(telegramToken, { polling: true });
const botStateManager = new BotStateManager();

const botMenuHandler = new MenuResponseFactory(bot, botStateManager);

process.on('uncaughtException', botMenuHandler.handleUncaughtException);
process.on('unhandledRejection', botMenuHandler.handleUnhandledRejection);

bot.on('message', botMenuHandler.handleMessage.bind(botMenuHandler));
bot.on('callback_query', botMenuHandler.handleCallbackQuery.bind(botMenuHandler));
