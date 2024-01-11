import { bot } from './utils/getBot.js';
import {
    getMainMenu,
    getChoiceMenu,
    getTaxiMenu,
    getTaxiMenuSouth,
    getTaxiMenuNorth,
    getTaxiMenuOnline
} from './utils/getMenu.js';
import { sendEmail } from './utils/sendEmail.js';
import { replyCheck } from './utils/replyCheck.js';

// Объект для хранения значения mirrorType
const state = {};

// Получение клавиатур для меню
const mainMenuData = {
    caption: 'Салют, Макатель. Че мутим?',
    reply_markup: {
        inline_keyboard: getMainMenu(),
    }
};

const taxiMenuData = {
    caption: 'Полевские такси:',
    reply_markup: {
        inline_keyboard: getTaxiMenu()
    }
};

const taxiSouthMenuData = {
    caption: 'Полевские такси (юг):',
    reply_markup: {
        inline_keyboard: getTaxiMenuSouth()
    }
};

const taxiNorthMenuData = {
    caption: 'Полевские такси (север):',
    reply_markup: {
        inline_keyboard: getTaxiMenuNorth()
    }
};

const taxiOnlineMenuData = {
    caption: 'Заказать такси онлайн:',
    reply_markup: {
        inline_keyboard: getTaxiMenuOnline()
    }
};

const getFilmsMirrorMenuData = (site, chatId) => {
    state[chatId] = { mirrorType: site };
    return {
        caption: `Оке, вот ${site.toUpperCase()}, че дальше:`,
        reply_markup: {
            inline_keyboard: getChoiceMenu(site)
        }
    };
}

// Отправление сообщений ботом
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendPhoto(chatId, './static/M.jpg', { ...mainMenuData, chat_id: chatId });
});

bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;

    // Удаляем текущее сообщение
    await bot.deleteMessage(chatId, query.message.message_id);

    const mirrorType = state[chatId] ? state[chatId].mirrorType : '';
    const choiceMenuData = getFilmsMirrorMenuData(query.data, chatId);

    switch (query.data) {
        // В главном меню:
        case 'kinoland': // Смотрим кинчик на KINOLAND
            await bot.sendPhoto(chatId, `./static/${query.data}.jpeg`, { ...choiceMenuData, chat_id: chatId });
            break;
        case 'hdrezka': // Смотрим кинчик на HDREZKA
            await bot.sendPhoto(chatId, `./static/${query.data}.jpeg`, { ...choiceMenuData, chat_id: chatId });
            break;
        case 'taxi': // Заказываем такси (old)
            await bot.sendPhoto(chatId, './static/taxi.jpeg', { ...taxiMenuData, chat_id: chatId });
            break;
        case 'taxiOnline': // Заказываем такси онлайн
            await bot.sendPhoto(chatId, './static/taxi.jpeg', { ...taxiOnlineMenuData, chat_id: chatId });
            break;
        case 'taxiSouth': // Двигаемся по городу (юг)
            await bot.sendPhoto(chatId, './static/taxi.jpeg', { ...taxiSouthMenuData, chat_id: chatId });
            break;
        case 'taxiNorth': // Двигаемся по городу (север)
            await bot.sendPhoto(chatId, './static/taxi.jpeg', { ...taxiNorthMenuData, chat_id: chatId });
            break;

        // В меню действия с зеркалами кинчиков:
        case 'checkLastReply': // Открыть последний ссыль
            replyCheck(query, mirrorType);
            break;
        case 'sendReq': // Обновить ссыль на зеркало
            sendEmail('mirror', mirrorType);
            bot.sendMessage(chatId, 'Запрос отправлен. Подожди несколько минут и попробуй проверить последнюю ссылку. Если она не обновится в течение 15 минут, отправь жалобу в техподдержку');
            setTimeout(() => bot.sendPhoto(chatId, './static/M.jpg', { ...mainMenuData, chat_id: chatId }), 2000);
            break;
        case 'createTicket': // Ссыль не обновляется
            sendEmail('ticket', mirrorType);
            bot.sendMessage(chatId, 'Разработчикам отправлен отчет о проблемах с обновлением ссылки');
            setTimeout(() => bot.sendPhoto(chatId, './static/M.jpg', { ...mainMenuData, chat_id: chatId }), 2000);
            break;

        // Другие
        case 'mainMenu': // Возврат в главное меню
            await bot.sendPhoto(chatId, './static/M.jpg', { ...mainMenuData, chat_id: chatId });
            break;
        default:
            // Обработка для номера такси
            if (query.data.startsWith('tel:')) {
                const taxiData = query.data.split('|');
                const phoneNumber = taxiData[0].replace('tel:', '');
                const taxiName = taxiData[1];
                bot.sendMessage(chatId, `Набирай ${taxiName}, брат: ${phoneNumber}`,);
                setTimeout(() => bot.sendPhoto(chatId, './static/taxi.jpeg', { ...taxiMenuData, chat_id: chatId }), 3000);
            }

            // Обработка для открытия группы в Telegram
            if (query.data.startsWith('link:')) {
                const groupLink = query.data.replace('link:', '');
                bot.sendMessage(chatId, `Линк на группу: ${groupLink}`);
            }
            break;
    }
});