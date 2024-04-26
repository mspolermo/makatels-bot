
import { frontendLink, telegramToken } from './src/config/config';
import {
    AdditionalMenuResponse,
    FilmsGeneralMenuResponse,
    FilmsMirrorMenuResponse,
    InitialMessageResponse,
    TaxiGeneralMenuResponse,
    TaxiTypeMenuResponse
} from './src/core/services/BotResponses/BotResponses';
import { ReplyChecker } from './src/infrastructure/replyChecker/replyChecker';
import { EmailSender } from './src/infrastructure/emailSender/emailSender';
import TelegramBot from 'node-telegram-bot-api';
import { BotStateManager } from './src/core/services/BotStateManager/BotStateManager';
import { moviesMirrorModel } from './src/core/model/MoviesMirrorModel/MoviesMirrorModel';

const bot: TelegramBot = new TelegramBot(telegramToken, { polling: true });

const initialMessage = InitialMessageResponse.getResponse()
const getFilmsGeneralMenuAnswer = FilmsGeneralMenuResponse.getResponse()
const getTaxiGeneralMenuAnswer =  TaxiGeneralMenuResponse.getResponse()
const getAdditionalMenuAnswer = AdditionalMenuResponse.getResponse()

class BotHandler {
    private botStateManager: BotStateManager;

    constructor() {
        this.botStateManager = new BotStateManager();
    }

    // Отправка фидбека на почту в случае краша приложения
    async handleUncaughtException(error: Error): Promise<void> {
        console.error('Необработанное исключение:', error);
        await (new EmailSender()).sendEmail('feedback', undefined, `Произошел краш приложения: ${error.message}`);
    }

    async handleUnhandledRejection(reason: any): Promise<void> {
        console.error('Необработанный Promise rejection:', reason);
        await (new EmailSender()).sendEmail('feedback', undefined, `Произошел краш приложения: ${reason}`);
    }

    // Обработка текстовых сообщений юзера
    async handleMessage(msg: any): Promise<void> {
        const chatId = msg.chat.id;
        const messageText = msg.text;

        if (this.botStateManager.isWaitingForFeedback(chatId)) {
            await (new EmailSender()).sendEmail('feedback', undefined, messageText);
            await this.botStateManager.clearWaitingForFeedback(chatId);
            await bot.sendMessage(chatId, 'Спасибо! Фидбэк отправлен разработчику');
            setTimeout(() => bot.sendPhoto(chatId, './public/init.jpg', initialMessage), 2000);
        } else if (messageText === '/kinoland') {
            await (new ReplyChecker(chatId, bot, 'kinoland')).checkReply();
        } else if (messageText === '/hdrezka') {
            await (new ReplyChecker(chatId, bot, 'hdrezka')).checkReply();
        } else if (messageText === '/buses') {
            await bot.sendMessage(chatId, 'Ссылка на форму расписания автобусов', {
                reply_markup: {
                    inline_keyboard: [[{
                        text: '🚍 Расписание автобусов 🚍',
                        web_app: { url: frontendLink }
                    }]]
                }
            });
        } else {
            await bot.sendPhoto(chatId, './public/init.jpg', initialMessage);
        }
    }
    
    // Отправление сообщений ботом
    async handleCallbackQuery(query: any): Promise<void> {
        if (!query.message || !query.data) return;
        const chatId = query.message.chat.id;

        try {
            await bot.deleteMessage(chatId, query.message.message_id);
        } catch (error) {
            const errorMessage = (error as Error).message;
            console.error('Ошибка при удалении сообщения:', errorMessage);
            await (new EmailSender()).sendEmail('feedback', undefined, `Произошла ошибка при стандартном удалении собщений ботом: ${errorMessage}`);
        }

        const mirrorType = this.botStateManager.getMirrorType(chatId);
        // Обявляем обновляемые ответы бота для видеосервисов
        const choiceMenuData = FilmsMirrorMenuResponse.getResponseViaMoviesMirrorType(query.data as moviesMirrorModel, chatId, this.botStateManager.setMirrorType.bind(this.botStateManager))

        switch (query.data) {
            //В главном меню:
            case 'movies': // Видео
                await bot.sendPhoto(chatId, `./public/videoService.jpg`, getFilmsGeneralMenuAnswer);
                break;
            case 'taxi': // Такси
                await bot.sendPhoto(chatId, `./public/taxiGeneral.jpg`, getTaxiGeneralMenuAnswer);
                break;
            case 'additional': // Другое
                await bot.sendPhoto(chatId, `./public/logo.jpg`, getAdditionalMenuAnswer);
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
                await (new ReplyChecker(chatId, bot, mirrorType!)).checkReply();
                break;
            case 'sendReq': // Обновить ссыль на зеркало
                await (new EmailSender).sendEmail('mirror', mirrorType);
                await bot.sendMessage(1, 'Запрос отправлен. Подожди несколько минут и попробуй проверить последнюю ссылку. Если она не обновится в течение 15 минут, создай репорт');
                setTimeout(() => bot.sendPhoto(chatId, './public/init.jpg', initialMessage), 2000);
                break;
            case 'createTicket': // Ссыль не обновляется
                await (new EmailSender).sendEmail('ticket', mirrorType);
                await bot.sendMessage(chatId, 'Разработчикам отправлен отчет о проблемах с обновлением ссылки');
                setTimeout(() => bot.sendPhoto(chatId, './public/init.jpg', initialMessage), 2000);
                break;
            // В меню такси:
            case 'taxiOnline': // Заказываем такси онлайн
                await bot.sendPhoto(chatId, './public/taxi.jpg', { ...(TaxiTypeMenuResponse.getResponseViaTaxiType('online')) });
                break;
            case 'taxiSouth': // Двигаемся по городу (юг)
                await bot.sendPhoto(chatId, './public/south.jpg', { ...(TaxiTypeMenuResponse.getResponseViaTaxiType('south'))});
                break;
            case 'taxiNorth': // Двигаемся по городу (север)
                await bot.sendPhoto(chatId, './public/north.jpg', { ...(TaxiTypeMenuResponse.getResponseViaTaxiType('north'))});
                break;
            // В меню дополнительно
            case 'suggest': // Предложить функционал
                this.botStateManager.setWaitingForFeedback(chatId);
                await bot.sendMessage(chatId, 'Напишите в ответном сообщении функционал, который бы вы хотели видеть в этом боте');
                break;
            case 'report': // Пожаловаться на работу бота
                this.botStateManager.setWaitingForFeedback(chatId);
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
                        setTimeout(() => bot.sendPhoto(chatId, './public/south.jpg', { ...(TaxiTypeMenuResponse.getResponseViaTaxiType('south'))}), 3000);
                    } else if (taxiName.includes('север')) {
                        setTimeout(() => bot.sendPhoto(chatId, './public/taxi.jpg', { ...(TaxiTypeMenuResponse.getResponseViaTaxiType('north'))}), 3000);
                    } else {
                        setTimeout(() => bot.sendPhoto(chatId, './public/taxi.jpg', { ...(TaxiTypeMenuResponse.getResponseViaTaxiType('online'))}), 3000);
                    }
                    
                }
                // Обработка для открытия группы в Telegram
                if (query.data.startsWith('link:')) {
                    const groupLink = query.data.replace('link:', '');
                    await bot.sendMessage(chatId, `Линк на группу: ${groupLink}`);
                }
                break;
        }
    }
}

const botHandler = new BotHandler();

process.on('uncaughtException', botHandler.handleUncaughtException);
process.on('unhandledRejection', botHandler.handleUnhandledRejection);

bot.on('message', botHandler.handleMessage.bind(botHandler));
bot.on('callback_query', botHandler.handleCallbackQuery.bind(botHandler));