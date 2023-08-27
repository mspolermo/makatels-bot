import { bot } from './utils/getBot.js';
import { getMainMenu } from './utils/getMainMenu.js';
import { sendEmail } from './utils/sendEmail.js';
import { replyCheck } from './utils/replyCheck.js';

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Салют, Макатель. Будем смотреть кинчик?`, {
        reply_markup: {
            inline_keyboard: getMainMenu()
        }
    });
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    if (query.data === 'sendReq') {
        sendEmail('mirror');
        bot.sendMessage(chatId, 'Запрос отправил. Погоди пару минут и попробуй чекнуть последний ссыль (пунк 1) ');
    };

    if (query.data === 'checkLastReply') {
        
        replyCheck(chatId);
        
    };

    if (query.data === 'createTicket') {
        sendEmail('ticket');
        bot.sendMessage(chatId, 'Нажаловался');
    };
});