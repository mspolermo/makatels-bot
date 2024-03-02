import {
    getMainMenu,
    getVideoMenu,
    getVideoChoiceMenu,
    getGeneralTaxiMenu,
    getTaxiMenuSouth,
    getTaxiMenuNorth,
    getTaxiMenuOnline,
    getAdditionalMenu
} from './getMenu.js';

// Ответы бота с подключенными клавиатурами

export const initialMessage = {
    caption: `MAKATEL'S BOT SERVICES`,
    reply_markup: {
        inline_keyboard: getMainMenu(),
    }
}

export const getFilmsGeneralMenuAnswer = () => {
    return {
        caption: `MAKATEL'S BOT VIDEO SERVICE`,
        reply_markup: {
            inline_keyboard: getVideoMenu()
        }
    };
}

export const getFilmsMirrorMenuData = (site, chatId, setFunction) => {
    setFunction(site, chatId);

    return {
        caption: `${site.toUpperCase()}:`,
        reply_markup: {
            inline_keyboard: getVideoChoiceMenu(site)
        }
    };
}

export const getTaxiGeneralMenuAnswer = () => {
    return {
        caption: `MAKATEL'S BOT TAXI SERVICE`,
        reply_markup: {
            inline_keyboard: getGeneralTaxiMenu()
        }
    };
}

export function getTaxiMenuAnswer(type) {
    let desc = '';
    let keyboard = [];
    switch (type) {
        case 'south':
            desc = 'Полевские такси (юг):';
            keyboard = getTaxiMenuSouth();
            break;
        case 'north':
            desc = 'Полевские такси (север):';
            keyboard = getTaxiMenuNorth();
            break;
        case 'online':
            desc = 'Заказать такси онлайн:';
            keyboard = getTaxiMenuOnline();
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
            inline_keyboard: getAdditionalMenu()
        }
    };
}