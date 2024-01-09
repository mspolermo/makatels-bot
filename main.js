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
    bot.sendPhoto(chatId, './static/M.jpg', { ...mainMenuData, chat_id: chatId });
});

bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;

    // Удаляем текущее сообщение
    await bot.deleteMessage(chatId, query.message.message_id);

    // Ответы на главное меню
    if (query.data === 'kinoland' || query.data === 'hdrezka') {
        const choiceMenuData = {
            caption: `Оке, вот ${query.data}, че дальше:`,
            reply_markup: {
                inline_keyboard: getChoiceMenu(query.data)
            }
        };

        state[chatId] = { mirrorType: query.data };

        // Отправляем новое изображение и текст в текущем чате
        await bot.sendPhoto(chatId, `./static/${query.data}.jpeg`, { ...choiceMenuData, chat_id: chatId });
    }

    // Ответы на меню действия с зеркалом кинчиков
    if (query.data === 'checkLastReply') {
        const mirrorType = state[chatId] ? state[chatId].mirrorType : '';
        replyCheck(chatId, mirrorType);
    }

    if (query.data === 'sendReq') {
        const mirrorType = state[chatId] ? state[chatId].mirrorType : '';
        sendEmail('mirror', mirrorType);
        bot.sendMessage(chatId, 'Запрос отправлен. Подожди несколько минут и попробуй проверить последнюю ссылку. Если она не обновится в течение 15 минут, отправь жалобу в техподдержку');
        setTimeout(() => bot.sendPhoto(chatId, './static/M.jpg', { ...mainMenuData, chat_id: chatId }), 2000);
    }

    if (query.data === 'createTicket') {
        const mirrorType = state[chatId] ? state[chatId].mirrorType : '';
        sendEmail('ticket', mirrorType);
        bot.sendMessage(chatId, 'Разработчикам отправлен отчет о проблемах с обновлением ссылки');
        setTimeout(() => bot.sendPhoto(chatId, './static/M.jpg', { ...mainMenuData, chat_id: chatId }), 2000);
    }

    // Обработчик для меню такси

        const taxiMenuData = {
            caption: 'Полевские такси:',
            reply_markup: {
                inline_keyboard: getTaxiMenu()
            }
        };    
    if (query.data === 'taxi') {


        // Отправляем новое изображение и текст в текущем чате
        await bot.sendPhoto(chatId, './static/taxi.jpeg', { ...taxiMenuData, chat_id: chatId });
    }

    // Обработка для номера такси
    if (query.data.startsWith('tel:')) {
        //const phoneNumber = query.data.replace('tel:', '');
        const taxiData = query.data.split('|');

        const phoneNumber = taxiData[0].replace('tel:', '');
        const taxiName = taxiData[1];
        bot.sendMessage(chatId, `Набирай ${taxiName}, брат: ${phoneNumber}`,);
        setTimeout(() => bot.sendPhoto(chatId, './static/M.jpg', { ...mainMenuData, chat_id: chatId }), 3000);
    }

    // Обработка для открытия группы в Telegram
    if (query.data.startsWith('link:')) {
        const groupLink = query.data.replace('link:', '');
        bot.sendMessage(chatId, `Линк на группу: ${groupLink}`);
    }

    // Возврат в "mainMenu"
    if (query.data === 'mainMenu') {
        // Отправляем новое изображение и текст в текущем чате
        await bot.sendPhoto(chatId, './static/M.jpg', { ...mainMenuData, chat_id: chatId });
    }
});