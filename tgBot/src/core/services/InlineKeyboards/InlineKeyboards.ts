import { InlineKeyboard, InlineButtonsRow } from "../../model/InlineButtonsRow/InlineButtonsRow";
import { frontendLink } from "../../../config/config";
import { moviesMirrorModel } from "../../model/MoviesMirrorModel/MoviesMirrorModel";
import { InlineKeyboardRepo } from "../../repositories/InlineKeyboardRepo/InlineKeyboardRepo";

// Реализация инлайн клавиатур (к сообщениям)

class InlineKeyboardClass implements InlineKeyboardRepo {
    protected keyboard: InlineButtonsRow[] = [];

    constructor(keyboardData: InlineButtonsRow[]) {
        for (let i = 0; i < keyboardData.length; i++ ) {
            this.addRow(keyboardData[i])
        }
    }

    addRow(row: InlineButtonsRow): void {
        this.keyboard.push(row);
    }

    getKeyboard(): InlineKeyboard {
        return { inline_keyboard: this.keyboard };
    }
}

const MainMenuKeyboard = new InlineKeyboardClass([
    [{ text: '🎬  Видео', callback_data: 'movies' }],
    [{ text: '🚕 Такси', callback_data: 'taxi' }],
    [{ text: '📰  Другое', callback_data: 'additional' }]
]);

const VideoMenuKeyboard = new InlineKeyboardClass([
    [{ text: '🎬  KINOLAND', callback_data: 'kinoland' }],
    [{ text: '🎬  HDREZKA', callback_data: 'hdrezka' }],
    [{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu' }]
]);

const GeneralTaxiMenuKeyboard = new InlineKeyboardClass([
    [{ text: '🚖  Двигаемся по городу (Юг)', callback_data: 'taxiSouth'}],
    [{ text: '🚖  Двигаемся по городу (Север)', callback_data: 'taxiNorth'}],
    [{ text: '🚕  Заказываем такси онлайн', callback_data: 'taxiOnline'}],
    [{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu'}]
]);

const SouthTaxiMenuKeyboard = new InlineKeyboardClass([
    [
        { text: '🚖  Регион (юг)',  callback_data: 'tel:89506556526|Регион (юг)'},
        { text: '🚖  Спутник (юг)', callback_data: 'tel:89501974244|Спутник (юг)'}
    ],
    [
        { text: '🚖  Ямщик (юг)', callback_data: 'tel:89043825687|Ямщик (юг)'},
        { text: '🚖  Максим (юг)', callback_data: 'tel:83435041616|Максим (юг)'}
    ],
    [{ text: '<- К предыдущему меню', callback_data: 'taxi'}],
    [{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu'}]
]);

const NorthTaxiMenuKeyboard = new InlineKeyboardClass([
    [
        { text: '🚖  Вояж (север)', callback_data: 'tel:83435053335|Вояж (север)'},
        { text: '🚖  Люкс (север)', callback_data: 'tel:89122206607|Люкс (север)'}
    ],
    [
        { text: '🚖  Регион (север)', callback_data: 'tel:89002036253|Регион (север)'},
        { text: '🚖  Штурман (север)', callback_data: 'tel:83435031220|Штурман (север)'}
    ],
    [{ text: '<- К предыдущему меню', callback_data: 'taxi'}],
    [{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu'}]
]);

const OnlineTaxiMenuKeyboard = new InlineKeyboardClass([
    [{ text: '🚕  Заказ онлайн (tg)', callback_data: 'link:https://t.me/polevskoy_taxi'}],
    [{ text: '🚕  Заказ онлайн 2 (tg)', callback_data: 'link:https://t.me/polevskoytaxi'}],
    [{ text: '🚕  Заказ онлайн 3 (vk)', callback_data: 'link:https://vk.me/join/z45V6aO7t4YiRArHfW7SiRWgr6RDeE_LTG4='}],
    [{ text: '🏎  Человек Смита -Втакси-', callback_data: 'tel:+79022725373|человеку Смита'}],
    [{ text: '<- К предыдущему меню', callback_data: 'taxi'}],
    [{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu'}]
]);

const AdditionalMenuKeyboard = new InlineKeyboardClass([
    [{ text: '🚍 Расписание автобусов 🚍', web_app: {url: frontendLink} }],
    [{ text: '🗳️ Предложить функционал', callback_data: 'suggest'}],
    [{ text: '📬 Пожаловаться на работу бота', callback_data: 'report'}],
    [{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu'}]
]);

// Расширенный класс для получения меню видеосервисов
class VideoChoiceInlineKeyboardClass extends InlineKeyboardClass {
    private choiceOption: moviesMirrorModel = 'hdrezka';

    constructor() {
        super([])
        this.refreshKeyboard();
    }

    updateChoiceOption(choiceOption: moviesMirrorModel): void {
        this.choiceOption = choiceOption;
        this.refreshKeyboard();
    }

    private refreshKeyboard() {
        this.clearKeyboard();
        this.addRow([{ text: `🎥  Открыть последний ссыль на ${this.choiceOption.toUpperCase()}`, callback_data: 'checkLastReply' }]);
        this.addRow([{ text: '📲  Обновить ссыль на зеркало', callback_data: 'sendReq' }]);
        this.addRow([{ text: '🔖  Ссыль не обновляется (репорт)', callback_data: 'createTicket' }]);
        this.addRow([{ text: '<- К предыдущему меню', callback_data: 'movies' }]);
        this.addRow([{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu' }]);
    }

    private clearKeyboard() {
        this.keyboard = [];
    }
}

const VideoChoiceMenuKeyboard = new VideoChoiceInlineKeyboardClass();

export {
    MainMenuKeyboard,
    VideoMenuKeyboard,
    VideoChoiceMenuKeyboard,
    GeneralTaxiMenuKeyboard,
    SouthTaxiMenuKeyboard,
    NorthTaxiMenuKeyboard,
    OnlineTaxiMenuKeyboard,
    AdditionalMenuKeyboard
}
