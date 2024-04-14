import { bot }  from './src/system/settings/botInit';
import { BotStateManager } from './src/system/settings/botStateManager';
import { sendEmail } from './src/utils/sendEmail';
import { checkReply } from './src/utils/checkReply';
import {
    initialMessage,
    getFilmsGeneralMenuAnswer,
    getFilmsMirrorMenuAnswer,
    getTaxiGeneralMenuAnswer,
    getTaxiTypeMenuAnswer,
    getAdditionalMenuAnswer
} from './src/system/answers';
import { moviesMirrorType } from './src/types/types';

// Отправка фидбека на почту в случае краша приложения
process.on('uncaughtException', async (error) => {
    console.error('Необработанное исключение:', error);
    await sendEmail('feedback', undefined, `Произошел краш приложения: ${error.message}`);
});
process.on('unhandledRejection', async (reason) => {
    console.error('Необработанный Promise rejection:', reason);
    await sendEmail('feedback', undefined, `Произошел краш приложения: ${reason}`);
});

const botStateManager = new BotStateManager();

// Обработка текстовых сообщений юзера
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (botStateManager.isWaitingForFeedback(chatId)) {
        await sendEmail('feedback', undefined, messageText);
        await botStateManager.clearWaitingForFeedback(chatId);
        await bot.sendMessage(chatId, 'Спасибо! Фидбэк отправлен разработчику');
        setTimeout(() => bot.sendPhoto(chatId, './public/init.jpg', initialMessage), 2000);
    } else {
        await bot.sendPhoto(chatId, './public/init.jpg', initialMessage);
    }
});

// Отправление сообщений ботом
bot.on('callback_query', async (query) => {
    if (!query.message) return;
    if (!query.data) return;
    const chatId = query.message.chat.id;

    try {
        await bot.deleteMessage(chatId, query.message.message_id);
    } catch (error) {
        const errorMessage = (error as Error).message;
        console.error('Ошибка при удалении сообщения:', errorMessage);
        await sendEmail('feedback', undefined, `Произошла ошибка при стандартном удалении собщений ботом: ${errorMessage}`);
    }

    const mirrorType = botStateManager.getMirrorType(chatId);
    const choiceMenuData = getFilmsMirrorMenuAnswer(query.data as moviesMirrorType, chatId, botStateManager.setMirrorType.bind(botStateManager));

    
    switch (query.data) {
        //В главном меню:
        case 'movies': // Видео
            await bot.sendPhoto(chatId, `./public/videoService.jpg`, getFilmsGeneralMenuAnswer());
            break;
        case 'taxi': // Такси
            await bot.sendPhoto(chatId, `./public/taxiGeneral.jpg`, getTaxiGeneralMenuAnswer());
            break;
        case 'additional': // Другое
            await bot.sendPhoto(chatId, `./public/logo.jpg`, getAdditionalMenuAnswer());
            break;
        // В меню фильмов:
        case 'kinoland': // KINOLAND
        if (choiceMenuData !== null) {
            await bot.sendPhoto(chatId, `./public/${query.data}.jpg`, choiceMenuData);
        }
            break;
        case 'hdrezka': // HDREZKA
        if (choiceMenuData !== null) {
            await bot.sendPhoto(chatId, `./public/${query.data}.jpg`, choiceMenuData);
        }
            break;
        // В меню действия с зеркалами кинчиков:
        case 'checkLastReply': // Открыть последний ссыль
            await checkReply(query, mirrorType);
            break;
        case 'sendReq': // Обновить ссыль на зеркало
            await sendEmail('mirror', mirrorType);
            await bot.sendMessage(chatId, 'Запрос отправлен. Подожди несколько минут и попробуй проверить последнюю ссылку. Если она не обновится в течение 15 минут, создай репорт');
            setTimeout(() => bot.sendPhoto(chatId, './public/init.jpg', initialMessage), 2000);
            break;
        case 'createTicket': // Ссыль не обновляется
            await sendEmail('ticket', mirrorType);
            await bot.sendMessage(chatId, 'Разработчикам отправлен отчет о проблемах с обновлением ссылки');
            setTimeout(() => bot.sendPhoto(chatId, './public/init.jpg', initialMessage), 2000);
            break;
        // В меню такси:
        case 'taxiOnline': // Заказываем такси онлайн
            await bot.sendPhoto(chatId, './public/taxi.jpg', { ...(getTaxiTypeMenuAnswer('online')) });
            break;
        case 'taxiSouth': // Двигаемся по городу (юг)
            await bot.sendPhoto(chatId, './public/south.jpg', { ...(getTaxiTypeMenuAnswer('south'))});
            break;
        case 'taxiNorth': // Двигаемся по городу (север)
            await bot.sendPhoto(chatId, './public/north.jpg', { ...(getTaxiTypeMenuAnswer('north')) });
            break;
        // В меню дополнительно
        case 'suggest': // Предложить функционал
            botStateManager.setWaitingForFeedback(chatId);
            await bot.sendMessage(chatId, 'Напишите в ответном сообщении функционал, который бы вы хотели видеть в этом боте');
            break;
        case 'report': // Пожаловаться на работу бота
            botStateManager.setWaitingForFeedback(chatId);
            await bot.sendMessage(chatId, 'Напишите в ответном сообщении проблему, с которой вы столкнулись');
            break;
        // Другие
        case 'mainMenu': // Возврат в главное меню
            await bot.sendPhoto(chatId, './public/init.jpg', initialMessage);
            break;
        default:
            // Обработка для номера такси
            if (query.data.startsWith('tel:')) {
                const taxiData = query.data.split('|');
                const phoneNumber = taxiData[0].replace('tel:', '');
                const taxiName = taxiData[1];
                await bot.sendMessage(chatId, `Набирай ${taxiName}, брат: ${phoneNumber}`);
                if (taxiName.includes('юг')) {
                    setTimeout(() => bot.sendPhoto(chatId, './public/south.jpg', { ...(getTaxiTypeMenuAnswer('south'))}), 3000);
                } else if (taxiName.includes('север')) {
                    setTimeout(() => bot.sendPhoto(chatId, './public/north.jpg', { ...(getTaxiTypeMenuAnswer('north')) }), 3000);
                } else {
                    setTimeout(() => bot.sendPhoto(chatId, './public/taxi.jpg', { ...(getTaxiTypeMenuAnswer('online')) }), 3000);
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
