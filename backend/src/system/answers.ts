import { InlineKeyboardMarkup, InlineKeyboardButton } from 'node-telegram-bot-api';
import { moviesMirrorType, taxiMenuType } from '../types/types';
import {
    getMainMenuKB,
    getVideoMenuKB,
    getVideoChoiceMenuKB,
    getGeneralTaxiMenuKB,
    getTaxiMenuSouthKB,
    getTaxiMenuNorthKB,
    getTaxiMenuOnlineKB,
    getAdditionalMenuKB
} from './keyboards';

// Ответы бота с подключенными клавиатурами

export const initialMessage = {
    caption: `MAKATEL'S BOT SERVICES`,
    reply_markup: {
        inline_keyboard: getMainMenuKB(),
    }
}

export const getFilmsGeneralMenuAnswer = () => {
    return {
        caption: `MAKATEL'S BOT VIDEO SERVICE`,
        reply_markup: {
            inline_keyboard: getVideoMenuKB()
        }
    };
}

export const getFilmsMirrorMenuAnswer = (site: moviesMirrorType, chatId: number, setFunction: Function) => {
    setFunction(site, chatId);

    const menu = getVideoChoiceMenuKB(site);
    if (menu === null) {
        // Обработка случая, когда меню не найдено
        return null;
    }
    if (site === null) {
        // Обработка случая, когда moviesMirrorType нет
        return null;
    }

    const inlineKeyboard: InlineKeyboardButton[][] = menu.map(row => row.map(item => ({ text: item.text, callback_data: item.callback_data })));

    const replyMarkup: InlineKeyboardMarkup = {
        inline_keyboard: inlineKeyboard
    };

    return {
        caption: `${site.toUpperCase()}:`,
        reply_markup: replyMarkup
    };
}

export const getTaxiGeneralMenuAnswer = () => {
    return {
        caption: `MAKATEL'S BOT TAXI SERVICE`,
        reply_markup: {
            inline_keyboard: getGeneralTaxiMenuKB()
        }
    };
}

export function getTaxiTypeMenuAnswer(type: taxiMenuType) {
    let desc = '';
    let keyboard: InlineKeyboardButton[][] = [];
    switch (type) {
        case 'south':
            desc = 'Полевские такси (юг):';
            keyboard = getTaxiMenuSouthKB();
            break;
        case 'north':
            desc = 'Полевские такси (север):';
            keyboard = getTaxiMenuNorthKB();
            break;
        case 'online':
            desc = 'Заказать такси онлайн:';
            keyboard = getTaxiMenuOnlineKB();
            break;
        default:
            break;
    }
    return {
        caption: desc,
        reply_markup: {
            inline_keyboard: keyboard
        }
    };
}

export const getAdditionalMenuAnswer = () => {
    return {
        caption: `MAKATEL'S BOT ADDITIONAL SERVICES`,
        reply_markup: {
            inline_keyboard: getAdditionalMenuKB()
        }
    };
}
