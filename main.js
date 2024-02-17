import { bot } from './utils/getBot.js';
import {
    getMainMenu,
    getChoiceMenu,
    getTaxiMenuSouth,
    getTaxiMenuNorth,
    getTaxiMenuOnline
} from './utils/getMenu.js';
import { sendEmail } from './utils/sendEmail.js';
import { replyCheck } from './utils/replyCheck.js';

// Объект для хранения значения mirrorType
let state = {};

// Получение клавиатур для меню
const mainMenuData = {
    caption: 'Салют, Макатель. Че мутим?',
    reply_markup: {
        inline_keyboard: getMainMenu(),
    }
};

const getTaxiMenuData = (taxiType) => {
    let desc = 'Заказать такси онлайн:';
    let keyboard = getTaxiMenuOnline();
    switch (taxiType) {
        case 'south':
            desc = 'Полевские такси (юг):';
            keyboard = getTaxiMenuSouth();
            break;
        case 'north':
            desc = 'Полевские такси (север):';
            keyboard = getTaxiMenuNorth();
            break;
        default:
            break;
    }
    return {
        caption: desc,
        reply_markup: {
            inline_keyboard: keyboard
        }
    }
}

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
    //await bot.deleteMessage(chatId, query.message.message_id);
    try {
        // Удаляем текущее сообщение
        await bot.deleteMessage(chatId, query.message.message_id);
    } catch (error) {
        console.error('Ошибка при удалении сообщения:', error.message);
        // Здесь можно предпринять дополнительные шаги при возникновении ошибки, если необходимо
    }

    const mirrorType = state[chatId] ? state[chatId].mirrorType : '';
    const choiceMenuData = getFilmsMirrorMenuData(query.data, chatId);

    switch (query.data) {
        // В главном меню:
        case 'kinoland': // Смотрим кинчик на KINOLAND
            await bot.sendPhoto(chatId, `./static/${query.data}.jpg`, { ...choiceMenuData, chat_id: chatId });
            break;
        case 'hdrezka': // Смотрим кинчик на HDREZKA
            await bot.sendPhoto(chatId, `./static/${query.data}.jpg`, { ...choiceMenuData, chat_id: chatId });
            break;
        case 'taxiOnline': // Заказываем такси онлайн
            await bot.sendPhoto(chatId, './static/taxi.jpg', { ...(getTaxiMenuData('online')), chat_id: chatId });
            break;
        case 'taxiSouth': // Двигаемся по городу (юг)
            await bot.sendPhoto(chatId, './static/south.jpg', { ...(getTaxiMenuData('south')), chat_id: chatId });
            break;
        case 'taxiNorth': // Двигаемся по городу (север)
            await bot.sendPhoto(chatId, './static/north.jpg', { ...(getTaxiMenuData('north')), chat_id: chatId });
            break;

        // В меню действия с зеркалами кинчиков:
        case 'checkLastReply': // Открыть последний ссыль
            await replyCheck(query, mirrorType);
            break;
        case 'sendReq': // Обновить ссыль на зеркало
            await sendEmail('mirror', mirrorType);
            await bot.sendMessage(chatId, 'Запрос отправлен. Подожди несколько минут и попробуй проверить последнюю ссылку. Если она не обновится в течение 15 минут, создай репорт');
            setTimeout(() => bot.sendPhoto(chatId, './static/M.jpg', { ...mainMenuData, chat_id: chatId }), 2000);
            break;
        case 'createTicket': // Ссыль не обновляется
            await sendEmail('ticket', mirrorType);
            await bot.sendMessage(chatId, 'Разработчикам отправлен отчет о проблемах с обновлением ссылки');
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
                await bot.sendMessage(chatId, `Набирай ${taxiName}, брат: ${phoneNumber}`,);
                if (taxiName.includes('юг')) {
                    setTimeout(() => bot.sendPhoto(chatId, './static/south.jpg', { ...(getTaxiMenuData('south')), chat_id: chatId }), 3000);
                } else if (taxiName.includes('север')) {
                    setTimeout(() => bot.sendPhoto(chatId, './static/north.jpg', { ...(getTaxiMenuData('north')), chat_id: chatId }), 3000);
                } else {
                    setTimeout(() => bot.sendPhoto(chatId, './static/taxi.jpg', { ...(getTaxiMenuData('online')), chat_id: chatId }), 3000);
                }
                
            }

            // Обработка для открытия группы в Telegram
            if (query.data.startsWith('link:')) {
                const groupLink = query.data.replace('link:', '');
                await bot.sendMessage(chatId, `Линк на группу: ${groupLink}`);
            }
            break;
    }
});