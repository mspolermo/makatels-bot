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

let mt = '';

export class MenuResponseFactory {
    private botStateManager: BotStateManager;

    constructor(botStateManager: BotStateManager) {
        this.botStateManager = botStateManager;
    }

    public getMessageType(data: string): string {
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
                // Обработка типов выбранного такси
                const taxiParsingData = taxiDataParser.handleData(query.data);
                await bot.sendMessage(chatId, taxiParsingData.msg);
                if (taxiParsingData.photo !== undefined) {
                    const [photoPath, botAnswer] = taxiParsingData.photo;
                    setTimeout(() => bot.sendPhoto(chatId, photoPath, botAnswer), 3000);
                }
                break;
        }
    }


    public getInitialMessage(): any {
        return InitialMessageResponse.getResponse();
    }
}