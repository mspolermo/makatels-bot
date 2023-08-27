import { bot } from './utils/getBot.js';
import { getMainMenu } from './utils/getMainMenu.js';
import { sendEmail } from './utils/sendEmail.js';
import { replyCheck } from './utils/replyCheck.js';

const mainMenuData = {
    caption: 'Салют, Макатель. Будем смотреть кинчик?',
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

    if (query.data === 'checkLastReply') {
        
        replyCheck(chatId);

    };

    if (query.data === 'sendReq') {
        sendEmail('mirror');
        bot.sendMessage(chatId, 'Запрос отправил. Погоди пару минут и попробуй чекнуть последний ссыль');
        setTimeout( () => bot.sendPhoto(chatId, './static/M.jpg', mainMenuData), 2000);
    };

    if (query.data === 'createTicket') {
        sendEmail('ticket');
        bot.sendMessage(chatId, 'Разработчикам отправлен репорт о проблемах с обновлением ссыля');
        setTimeout( () => bot.sendPhoto(chatId, './static/M.jpg', mainMenuData), 2000);
    };
});
