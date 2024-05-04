// TODO переделать

import { moviesMirrorModel } from '../../core/model/MoviesMirrorModel/MoviesMirrorModel';
import { BotStateManager } from '../../core/services/BotStateManager/BotStateManager';
import { taxiMenuModel } from '../../core/model/TaxiMenuModel/TaxiMenuModel';
import { 
    AdditionalMenuResponse,
    FilmsGeneralMenuResponse,
    FilmsMirrorMenuResponse,
    InitialMessageResponse,
    TaxiGeneralMenuResponse,
    TaxiTypeMenuResponse
} from '../../core/services/BotResponses/BotResponses';
import { BotAnswer } from '../../core/model/BotAnswer/BotAnswer';
import TelegramBot from 'node-telegram-bot-api';
import { ReplyChecker } from '../replyChecker/replyChecker';
import { EmailSender } from '../emailSender/emailSender';


interface responseFactory {
    msg: string;
    photo: [string, BotAnswer] | undefined;
}



let mt = '';

export class MenuResponseFactory {
    private msg: string | undefined = undefined;
    private photo: [string, BotAnswer] | undefined = undefined;

    private bot: TelegramBot;
    private botStateManager: BotStateManager;

    constructor(bot: TelegramBot, botStateManager: BotStateManager) {
        this.bot = bot;
        this.botStateManager = botStateManager;
    }
    public async getMessageType(chatId: number, data: string) {
        const choiceMenuData = FilmsMirrorMenuResponse.getResponseViaMoviesMirrorType(
            data as moviesMirrorModel,
            chatId,
            this.botStateManager.setMirrorType.bind(this.botStateManager)
        );
        const mirrorType = this.botStateManager.getMirrorType(chatId);

        switch (data) {
            //В главном меню:
            case 'movies': // Видео
            await this.bot.sendPhoto(chatId, `./public/videoService.jpg`, FilmsGeneralMenuResponse.getResponse());
                break;
            case 'taxi': // Такси
            await this.bot.sendPhoto(chatId, `./public/taxiGeneral.jpg`, TaxiGeneralMenuResponse.getResponse());
                break;
            case 'additional': // Другое
            await this.bot.sendPhoto(chatId, `./public/logo.jpg`, AdditionalMenuResponse.getResponse());
                break;
            // В меню фильмов:
            case 'kinoland': // KINOLAND
            if (choiceMenuData !== null) {
                await this.bot.sendPhoto(chatId, `./public/${data}.jpg`, choiceMenuData);
            }
                break;
            case 'hdrezka': // HDREZKA
            if (choiceMenuData !== null) {
                await this.bot.sendPhoto(chatId, `./public/${data}.jpg`, choiceMenuData);
            }
                break;
            // В меню действия с зеркалами кинчиков:
            case 'checkLastReply': // Открыть последний ссыль
                await (new ReplyChecker(chatId, this.bot, mirrorType!)).checkReply();
                break;
            case 'sendReq': // Обновить ссыль на зеркало
                await (new EmailSender).sendEmail('mirror', mirrorType);
                await this.bot.sendMessage(1, 'Запрос отправлен. Подожди несколько минут и попробуй проверить последнюю ссылку. Если она не обновится в течение 15 минут, создай репорт');
                setTimeout(() => this.bot.sendPhoto(chatId, './public/init.jpg', InitialMessageResponse.getResponse()), 2000);
                break;
            case 'createTicket': // Ссыль не обновляется
                await (new EmailSender).sendEmail('ticket', mirrorType);
                await this.bot.sendMessage(chatId, 'Разработчикам отправлен отчет о проблемах с обновлением ссылки');
                setTimeout(() => this.bot.sendPhoto(chatId, './public/init.jpg', InitialMessageResponse.getResponse()), 2000);
                break;
            // В меню такси:
            case 'taxiOnline': // Заказываем такси онлайн
                await this.bot.sendPhoto(chatId, './public/taxi.jpg', { ...(TaxiTypeMenuResponse.getResponseViaTaxiType('online')) });
                break;
            case 'taxiSouth': // Двигаемся по городу (юг)
                await this.bot.sendPhoto(chatId, './public/south.jpg', { ...(TaxiTypeMenuResponse.getResponseViaTaxiType('south'))});
                break;
            case 'taxiNorth': // Двигаемся по городу (север)
                await this.bot.sendPhoto(chatId, './public/north.jpg', { ...(TaxiTypeMenuResponse.getResponseViaTaxiType('north'))});
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
                await this.bot.sendPhoto(chatId, './public/init.jpg', InitialMessageResponse.getResponse());
                break;
            default:
                // Обработка типов выбранного такси
                const taxiParsingData = taxiDataParser.handleData(query.data);
                await this.bot.sendMessage(chatId, taxiParsingData.msg);
                if (taxiParsingData.photo !== undefined) {
                    const [photoPath, botAnswer] = taxiParsingData.photo;
                    setTimeout(() => this.bot.sendPhoto(chatId, photoPath, botAnswer), 3000);
                }
                break;
        }
    }

}