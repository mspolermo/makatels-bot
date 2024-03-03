import { bot } from './src/system/getBot.js';
import { BotStateManager } from './src/config/botStateManager.js';
import { sendEmail } from './src/system/sendEmail.js';
import { replyCheck } from './src/system/replyCheck.js';
import { getBusTable } from './src/system/getBusTable.js'
import {
    initialMessage,
    getFilmsGeneralMenuAnswer,
    getFilmsMirrorMenuData,
    getTaxiGeneralMenuAnswer,
    getTaxiMenuAnswer,
    getAdditionalMenuAnswer
} from './src/system/getAnswer.js';


// Отправка фидбека на почту в лучае краша приложения
process.on('uncaughtException', async (error) => {
    console.error('Необработанное исключение:', error);
    await sendEmail('feedback', '', `Произошел краш приложения: ${error.message}`);
});
process.on('unhandledRejection', async (reason) => {
    console.error('Необработанный Promise rejection:', reason);
    await sendEmail('feedback', '', `Произошел краш приложения: ${reason}`);
});

const botStateManager = new BotStateManager();

// Обработка текстовых сообщений юзера
bot.on('message', async (msg) => {

    const chatId = msg.chat.id;
    const messageText = msg.text;

    // Проверяем state, ожидает ли бот сообщения-фидбэка, для отправки на почту
    if (botStateManager.isWaitingForFeedback(chatId))  {

        await sendEmail('feedback', '', messageText);
        await botStateManager.clearWaitingForFeedback(chatId);
        await bot.sendMessage(chatId, 'Спасибо! Фидбэк отправлен разработчику');
        setTimeout(() => bot.sendPhoto(chatId, './public/M.jpg', { ...initialMessage, chat_id: chatId }), 2000);
        
    } else {
        await bot.sendPhoto(chatId, './public/M.jpg', { ...initialMessage, chat_id: chatId });
    }
});

// Отправление сообщений ботом
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;

    try {
        // Удаляем текущее сообщение
        await bot.deleteMessage(chatId, query.message.message_id);
    } catch (error) {
        console.error('Ошибка при удалении сообщения:', error.message);
        await sendEmail('feedback', '', `Произошла ошибка при стандартном удалении собщений ботом: ${error.message}`);
    }

    const mirrorType = botStateManager.getMirrorType(chatId);
    const choiceMenuData = getFilmsMirrorMenuData(query.data, chatId, botStateManager.setMirrorType.bind(botStateManager));


    switch (query.data) {
        //В главном меню:
        case 'movies': // Видео
        await bot.sendPhoto(chatId, `./public/videoService.jpg`, getFilmsGeneralMenuAnswer());
        break;
        case 'taxi': // Такси
        await bot.sendPhoto(chatId, `./public/taxiGeneral.jpg`, getTaxiGeneralMenuAnswer());
        break;
        case 'additional': // Другое
        await bot.sendPhoto(chatId, `./public/M(old).jpg`, getAdditionalMenuAnswer());
        break;
        // В меню фильмов:
        case 'kinoland': // KINOLAND
            await bot.sendPhoto(chatId, `./public/${query.data}.jpg`, { ...choiceMenuData, chat_id: chatId });
            break;
        case 'hdrezka': // HDREZKA
            await bot.sendPhoto(chatId, `./public/${query.data}.jpg`, { ...choiceMenuData, chat_id: chatId });
            break;
        // В меню действия с зеркалами кинчиков:
        case 'checkLastReply': // Открыть последний ссыль
            await replyCheck(query, mirrorType);
            break;
        case 'sendReq': // Обновить ссыль на зеркало
            await sendEmail('mirror', mirrorType);
            await bot.sendMessage(chatId, 'Запрос отправлен. Подожди несколько минут и попробуй проверить последнюю ссылку. Если она не обновится в течение 15 минут, создай репорт');
            setTimeout(() => bot.sendPhoto(chatId, './public/M.jpg', { ...initialMessage, chat_id: chatId }), 2000);
            break;
        case 'createTicket': // Ссыль не обновляется
            await sendEmail('ticket', mirrorType);
            await bot.sendMessage(chatId, 'Разработчикам отправлен отчет о проблемах с обновлением ссылки');
            setTimeout(() => bot.sendPhoto(chatId, './public/M.jpg', { ...initialMessage, chat_id: chatId }), 2000);
            break;
        // В меню такси:
        case 'taxiOnline': // Заказываем такси онлайн
            await bot.sendPhoto(chatId, './public/taxi.jpg', { ...(getTaxiMenuAnswer('online')), chat_id: chatId });
            break;
        case 'taxiSouth': // Двигаемся по городу (юг)
            await bot.sendPhoto(chatId, './public/south.jpg', { ...(getTaxiMenuAnswer('south')), chat_id: chatId });
            break;
        case 'taxiNorth': // Двигаемся по городу (север)
            await bot.sendPhoto(chatId, './public/north.jpg', { ...(getTaxiMenuAnswer('north')), chat_id: chatId });
            break;
        // В меню дополнительно
        case 'bus': // Расписание автобусов в Екб'
            try {
                const answer = await getBusTable('directly');
                await bot.sendMessage(chatId, `${answer}`);
            } catch (error) {
                console.error('Ошибка при получении расписания автобусов:', error.message);
                await sendEmail('feedback', '', `Произошла ошибка при загрузке расписания автобусов: ${error.message}`);
                await bot.sendMessage(chatId, 'Произошла ошибка при получении расписания автобусов. Попробуйте позже.');
            }
            break;
        case 'busInverted': // Расписание автобусов из Екб'
            try {
                const answer = await getBusTable('inverted');
                await bot.sendMessage(chatId, `${answer}`);
            } catch (error) {
                console.error('Ошибка при получении расписания автобусов:', error.message);
                await sendEmail('feedback', '', `Произошла ошибка при загрузке расписания автобусов: ${error.message}`);
                await bot.sendMessage(chatId, 'Произошла ошибка при получении расписания автобусов. Попробуйте позже.');
            }
            break;
        case 'suggest': // Предложить функционал
            botStateManager.setWaitingForFeedback(true, chatId);
            await bot.sendMessage(chatId, 'Напишите в ответном сообщений функционал, который бы вы хотели видеть в этом боте');
            break;
        case 'report': // Пожаловаться на работу бота
            botStateManager.setWaitingForFeedback(true, chatId);
            await bot.sendMessage(chatId, 'Напишите в ответном сообщений проблему с которой вы столкнулись');
            break;
        // Другие
        case 'mainMenu': // Возврат в главное меню
            await bot.sendPhoto(chatId, './public/M.jpg', { ...initialMessage, chat_id: chatId });
            break;
        default:
            // Обработка для номера такси
            if (query.data.startsWith('tel:')) {
                const taxiData = query.data.split('|');
                const phoneNumber = taxiData[0].replace('tel:', '');
                const taxiName = taxiData[1];
                await bot.sendMessage(chatId, `Набирай ${taxiName}, брат: ${phoneNumber}`,);
                if (taxiName.includes('юг')) {
                    setTimeout(() => bot.sendPhoto(chatId, './public/south.jpg', { ...(getTaxiMenuAnswer('south')), chat_id: chatId }), 3000);
                } else if (taxiName.includes('север')) {
                    setTimeout(() => bot.sendPhoto(chatId, './public/north.jpg', { ...(getTaxiMenuAnswer('north')), chat_id: chatId }), 3000);
                } else {
                    setTimeout(() => bot.sendPhoto(chatId, './public/taxi.jpg', { ...(getTaxiMenuAnswer('online')), chat_id: chatId }), 3000);
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
