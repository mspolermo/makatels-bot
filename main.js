import { bot } from './utils/getBot.js';
import {
    initialMessage,
    getFilmsGeneralMenuAnswer,
    getFilmsMirrorMenuData,
    getTaxiGeneralMenuAnswer,
    getTaxiMenuAnswer,
    getAdditionalMenuAnswer
} from './utils/getAnswer.js';

import { sendEmail } from './utils/sendEmail.js';
import { replyCheck } from './utils/replyCheck.js';

// Объект для хранения значения mirrorType
let state = {};
// Установка значения mirrorType
function setMirrorType(value, chatId) {
    state[chatId] = { mirrorType: value };
}

// Отправление сообщений ботом
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendPhoto(chatId, './static/M.jpg', { ...initialMessage, chat_id: chatId });
});

bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;

    try {
        // Удаляем текущее сообщение
        await bot.deleteMessage(chatId, query.message.message_id);
    } catch (error) {
        console.error('Ошибка при удалении сообщения:', error.message);
        // Здесь можно предпринять дополнительные шаги при возникновении ошибки, если необходимо
    }

    const mirrorType = state[chatId] ? state[chatId].mirrorType : '';
    const choiceMenuData = getFilmsMirrorMenuData(query.data, chatId, setMirrorType);

    switch (query.data) {
        //В главном меню:
        case 'movies': 
        await bot.sendPhoto(chatId, `./static/M(old).jpg`, getFilmsGeneralMenuAnswer());
        break;
        case 'taxi': 
        await bot.sendPhoto(chatId, `./static/M(old).jpg`, getTaxiGeneralMenuAnswer());
        break;
        case 'additional':
        await bot.sendPhoto(chatId, `./static/M(old).jpg`, getAdditionalMenuAnswer());
        break;
        // В меню фильмов:
        case 'kinoland': // Смотрим кинчик на KINOLAND
            await bot.sendPhoto(chatId, `./static/${query.data}.jpg`, { ...choiceMenuData, chat_id: chatId });
            break;
        case 'hdrezka': // Смотрим кинчик на HDREZKA
            await bot.sendPhoto(chatId, `./static/${query.data}.jpg`, { ...choiceMenuData, chat_id: chatId });
            break;

        // В меню действия с зеркалами кинчиков:
        case 'checkLastReply': // Открыть последний ссыль
            await replyCheck(query, mirrorType);
            break;
        case 'sendReq': // Обновить ссыль на зеркало
            await sendEmail('mirror', mirrorType);
            await bot.sendMessage(chatId, 'Запрос отправлен. Подожди несколько минут и попробуй проверить последнюю ссылку. Если она не обновится в течение 15 минут, создай репорт');
            setTimeout(() => bot.sendPhoto(chatId, './static/M.jpg', { ...initialMessage, chat_id: chatId }), 2000);
            break;
        case 'createTicket': // Ссыль не обновляется
            await sendEmail('ticket', mirrorType);
            await bot.sendMessage(chatId, 'Разработчикам отправлен отчет о проблемах с обновлением ссылки');
            setTimeout(() => bot.sendPhoto(chatId, './static/M.jpg', { ...initialMessage, chat_id: chatId }), 2000);
            break;
        // В меню такси:
        case 'taxiOnline': // Заказываем такси онлайн
            await bot.sendPhoto(chatId, './static/taxi.jpg', { ...(getTaxiMenuAnswer('online')), chat_id: chatId });
            break;
        case 'taxiSouth': // Двигаемся по городу (юг)
            await bot.sendPhoto(chatId, './static/south.jpg', { ...(getTaxiMenuAnswer('south')), chat_id: chatId });
            break;
        case 'taxiNorth': // Двигаемся по городу (север)
            await bot.sendPhoto(chatId, './static/north.jpg', { ...(getTaxiMenuAnswer('north')), chat_id: chatId });
            break;

        // Другие
        case 'mainMenu': // Возврат в главное меню
            await bot.sendPhoto(chatId, './static/M.jpg', { ...initialMessage, chat_id: chatId });
            break;
        default:
            // Обработка для номера такси
            if (query.data.startsWith('tel:')) {
                const taxiData = query.data.split('|');
                const phoneNumber = taxiData[0].replace('tel:', '');
                const taxiName = taxiData[1];
                await bot.sendMessage(chatId, `Набирай ${taxiName}, брат: ${phoneNumber}`,);
                if (taxiName.includes('юг')) {
                    setTimeout(() => bot.sendPhoto(chatId, './static/south.jpg', { ...(getTaxiMenuAnswer('south')), chat_id: chatId }), 3000);
                } else if (taxiName.includes('север')) {
                    setTimeout(() => bot.sendPhoto(chatId, './static/north.jpg', { ...(getTaxiMenuAnswer('north')), chat_id: chatId }), 3000);
                } else {
                    setTimeout(() => bot.sendPhoto(chatId, './static/taxi.jpg', { ...(getTaxiMenuAnswer('online')), chat_id: chatId }), 3000);
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
