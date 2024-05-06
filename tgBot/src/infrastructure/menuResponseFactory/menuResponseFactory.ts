import TelegramBot from 'node-telegram-bot-api';

import { moviesMirrorModel } from '../../core/model/MoviesMirrorModel/MoviesMirrorModel';
import { BotStateManager } from '../../core/services/BotStateManager/BotStateManager';
import { 
    AdditionalMenu,
    MoviesGeneralMenu,
    MoviesMirrorMenu,
    InitialMenu,
    TaxiGeneralMenu,
    TaxiTypeMenu
} from '../../core/services/BotResponses/BotResponses';

import { ReplyChecker } from '../replyChecker/replyChecker';
import { EmailSender } from '../emailSender/emailSender';
import { taxiDataParser } from '../taxiDataParser/taxiDataParser';
import { frontendLink } from '../../config/config';


export class MenuResponseFactory {
    private bot: TelegramBot;
    private botStateManager: BotStateManager;
    private emailSender: EmailSender; 

    constructor(bot: TelegramBot, botStateManager: BotStateManager) {
        this.bot = bot;
        this.botStateManager = botStateManager;
        this.emailSender = new EmailSender();
    }

    // Отправка фидбека на почту в случае краша приложения
    async handleUncaughtException(error: Error): Promise<void> {
        console.error('Необработанное исключение:', error);
        await this.emailSender.sendEmail('feedback', undefined, `Произошел краш приложения: ${error.message}`);
    }

    async handleUnhandledRejection(reason: any): Promise<void> {
        console.error('Необработанный Promise rejection:', reason);
        await this.emailSender.sendEmail('feedback', undefined, `Произошел краш приложения: ${reason}`);
    }

    // Обработка текстовых сообщений юзера
    async handleMessage(msg: any): Promise<void> {
        const chatId = msg.chat.id;
        const messageText = msg.text;

        if (this.botStateManager.isWaitingForFeedback(chatId)) {
            await this.emailSender.sendEmail('feedback', undefined, messageText);
            await this.botStateManager.clearWaitingForFeedback(chatId);
            await this.bot.sendMessage(chatId, 'Спасибо! Фидбэк отправлен разработчику');
            setTimeout(() => this.bot.sendPhoto(chatId, './public/init.jpg', InitialMenu.getResponse()), 2000);
        } else if (messageText === '/kinoland') {
            await (new ReplyChecker(chatId, this.bot, 'kinoland')).checkReply();
        } else if (messageText === '/hdrezka') {
            await (new ReplyChecker(chatId, this.bot, 'hdrezka')).checkReply();
        } else if (messageText === '/buses') {
            await this.bot.sendMessage(chatId, 'Ссылка на форму расписания автобусов', {
                reply_markup: {
                    inline_keyboard: [[{
                        text: '🚍 Расписание автобусов 🚍',
                        web_app: { url: frontendLink }
                    }]]
                }
            });
        } else {
            await this.bot.sendPhoto(chatId, './public/init.jpg', InitialMenu.getResponse());
        }
    }


    async handleCallbackQuery(query: any): Promise<void> {
        if (!query.message || !query.data) return;
        const chatId = query.message.chat.id;

        try {
            await this.bot.deleteMessage(chatId, query.message.message_id);
        } catch (error) {
            const errorMessage = (error as Error).message;
            console.error('Ошибка при удалении сообщения:', errorMessage);
            await this.emailSender.sendEmail('feedback', undefined, `Произошла ошибка при стандартном удалении собщений ботом: ${errorMessage}`);
        }

        this.getMenuAction(chatId, query.data)
    }

    // Обработка действий пользователя во всех меню бота
    public async getMenuAction(chatId: number, data: string) {

        const mirrorType = this.botStateManager.getMirrorType(chatId);

        switch (data) {
            //В главном меню:
            case 'movies': // Видео
            await this.bot.sendPhoto(chatId, `./public/videoService.jpg`, MoviesGeneralMenu.getResponse());
                break;
            case 'taxi': // Такси
            await this.bot.sendPhoto(chatId, `./public/taxiGeneral.jpg`, TaxiGeneralMenu.getResponse());
                break;
            case 'additional': // Другое
            await this.bot.sendPhoto(chatId, `./public/logo.jpg`, AdditionalMenu.getResponse());
                break;
            // В меню фильмов:
            case 'kinoland': // KINOLAND
                const kinolandData = MoviesMirrorMenu.getResponseViaMoviesMirrorType(
                    data as moviesMirrorModel,
                    chatId,
                    this.botStateManager.setMirrorType.bind(this.botStateManager)
                );
                await this.bot.sendPhoto(chatId, `./public/${data}.jpg`, kinolandData);
                break;
            case 'hdrezka': // HDREZKA
                const hdrezkaData = MoviesMirrorMenu.getResponseViaMoviesMirrorType(
                data as moviesMirrorModel,
                chatId,
                this.botStateManager.setMirrorType.bind(this.botStateManager)
            );
                await this.bot.sendPhoto(chatId, `./public/${data}.jpg`, hdrezkaData);
            
                break;
            // В меню действия с зеркалами кинчиков:
            case 'checkLastReply': // Открыть последний ссыль
                await (new ReplyChecker(chatId, this.bot, mirrorType!)).checkReply();
                break;
            case 'sendReq': // Обновить ссыль на зеркало
                await this.emailSender.sendEmail('mirror', mirrorType);
                await this.bot.sendMessage(1, 'Запрос отправлен. Подожди несколько минут и попробуй проверить последнюю ссылку. Если она не обновится в течение 15 минут, создай репорт');
                setTimeout(() => this.bot.sendPhoto(chatId, './public/init.jpg', InitialMenu.getResponse()), 2000);
                break;
            case 'createTicket': // Ссыль не обновляется
                await this.emailSender.sendEmail('ticket', mirrorType);
                await this.bot.sendMessage(chatId, 'Разработчикам отправлен отчет о проблемах с обновлением ссылки');
                setTimeout(() => this.bot.sendPhoto(chatId, './public/init.jpg', InitialMenu.getResponse()), 2000);
                break;
            // В меню такси:
            case 'taxiOnline': // Заказываем такси онлайн
                await this.bot.sendPhoto(chatId, './public/taxi.jpg', { ...(TaxiTypeMenu.getResponseViaTaxiType('online')) });
                break;
            case 'taxiSouth': // Двигаемся по городу (юг)
                await this.bot.sendPhoto(chatId, './public/south.jpg', { ...(TaxiTypeMenu.getResponseViaTaxiType('south'))});
                break;
            case 'taxiNorth': // Двигаемся по городу (север)
                await this.bot.sendPhoto(chatId, './public/north.jpg', { ...(TaxiTypeMenu.getResponseViaTaxiType('north'))});
                break;
            // В меню дополнительно
            case 'suggest': // Предложить функционал
                this.botStateManager.setWaitingForFeedback(chatId);
                await this.bot.sendMessage(chatId, 'Напишите в ответном сообщении функционал, который бы вы хотели видеть в этом боте');
                break;
            case 'report': // Пожаловаться на работу бота
                this.botStateManager.setWaitingForFeedback(chatId);
                await this.bot.sendMessage(chatId, 'Напишите в ответном сообщении проблему, с которой вы столкнулись');
                break;
            // Другие
            case 'mainMenu': // Возврат в главное меню
                await this.bot.sendPhoto(chatId, './public/init.jpg', InitialMenu.getResponse());
                break;
            default:
                // Обработка типов выбранного такси
                const taxiParsingData = taxiDataParser.handleData(data);
                await this.bot.sendMessage(chatId, taxiParsingData.msg);
                if (taxiParsingData.photo !== undefined) {
                    const [photoPath, botAnswer] = taxiParsingData.photo;
                    setTimeout(() => this.bot.sendPhoto(chatId, photoPath, botAnswer), 3000);
                }
                break;
        }
    }

}