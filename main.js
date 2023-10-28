import { bot } from './utils/getBot.js';
import { getMainMenu, getChoiceMenu, getTaxiMenu } from './utils/getMenu.js';
import { sendEmail } from './utils/sendEmail.js';
import { replyCheck } from './utils/replyCheck.js';



// Объект для хранения значения mirrorType
const state = {};

const mainMenuData = {
    caption: 'Салют, Макатель. Че мутим?',
    reply_markup: {
        inline_keyboard: getMainMenu()
    }
};

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendPhoto(chatId, './static/M.jpg', mainMenuData);
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    // Отправка меню действия с зерккалом кинчиков
    const choiceMenuData = {
        caption: `Оке, вот ${query.data}, че дальше:`,
        reply_markup: {
            inline_keyboard: getChoiceMenu(query.data)
        }
    };

    const taxiMenuData = {
        caption: 'Куда звоним:',
        reply_markup: {
            inline_keyboard: getTaxiMenu()
        }
    };

    // Ответы на главное меню
    if (query.data === 'kinoland') {
        bot.sendPhoto(chatId, './static/kinoland.jpeg', choiceMenuData);
        state[chatId] = { mirrorType: 'kinoland' };
    }
    
    if (query.data === 'hdrezka') {
        bot.sendPhoto(chatId, './static/hdrezka.jpeg', choiceMenuData);
        state[chatId] = { mirrorType: 'hdrezka' };
    }

    // Ответы на меню действия с зерккалом кинчиков
    if (query.data === 'checkLastReply') {
        const mirrorType = state[chatId] ? state[chatId].mirrorType : '';
        replyCheck(chatId, mirrorType);
    }

    if (query.data === 'sendReq') {
        const mirrorType = state[chatId] ? state[chatId].mirrorType : '';
        sendEmail('mirror', mirrorType);
        bot.sendMessage(chatId, 'Запрос отправлен. Подожди несколько минут и попробуй проверить последнюю ссылку. Если она не обновится в течение 15 минут, отправь жалобу в техподдержку');
        setTimeout(() => bot.sendPhoto(chatId, './static/M.jpg', mainMenuData), 2000);
    }

    if (query.data === 'createTicket') {
        const mirrorType = state[chatId] ? state[chatId].mirrorType : '';
        sendEmail('ticket', mirrorType);
        bot.sendMessage(chatId, 'Разработчикам отправлен отчет о проблемах с обновлением ссылки');
        setTimeout(() => bot.sendPhoto(chatId, './static/M.jpg', mainMenuData), 2000);
    }

    // Обработчик для меню такси
    if (query.data === 'taxi') {
        const taxiMenuData = {
            caption: 'Полевские такси:',
            reply_markup: {
                inline_keyboard: getTaxiMenu()
            }
        };
        bot.sendPhoto(chatId, './static/taxi.jpeg', taxiMenuData);
    }

    // Обработка для номера такси
    if (query.data.startsWith('tel:')) {
        const phoneNumber = query.data.replace('tel:', '');bot.sendMessage(chatId, `Набирай ${phoneNumber}`, {
            reply_markup: {
                keyboard: [[{ text: `Набирай ${phoneNumber}`, request_contact: true }]],
                one_time_keyboard: true
            }
        });
    }

    // Обработка для открытия группы в Telegram
    if (query.data.startsWith('link:')) {
        const groupLink = query.data.replace('link:', '');
        bot.sendMessage(chatId, `Линк на группу: ${groupLink}`);
    }

    // Возврат в "mainMenu"
    if (query.data === 'mainMenu') {
        bot.sendPhoto(chatId, './static/M.jpg', mainMenuData);
    }
});
