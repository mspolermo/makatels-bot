import { moviesMirrorType } from "../types/types";
import { frontendLink } from "../config/config";

interface KeyboardButton {
    text: string;
    callback_data?: string;
    web_app?: {
        url: string;
    };
}

type KeyboardRow = KeyboardButton[];

abstract class Keyboard {
    protected rows: KeyboardRow[] = [];

    addRow(row: KeyboardRow): void {
        this.rows.push(row);
    }

    getKeyboard(): KeyboardRow[] {
        return this.rows;
    }
}

// Реализация



class MainMenuKeyboard extends Keyboard {
    constructor() {
        super();
        this.addRow([{ text: '🎬  Видео', callback_data: 'movies' }]);
        this.addRow([{ text: '🚕 Такси', callback_data: 'taxi' }]);
        this.addRow([{ text: '📰  Другое', callback_data: 'additional' }]);
    }
}

class VideoMenuKeyboard extends Keyboard {
    constructor() {
        super();
        this.addRow([{ text: '🎬  KINOLAND', callback_data: 'kinoland' }]);
        this.addRow([{ text: '🎬  HDREZKA', callback_data: 'hdrezka' }]);
        this.addRow([{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu' }]);
    }
}

class VideoChoiceMenuKeyboard extends Keyboard {
    constructor(private choiceOption: moviesMirrorType) {
        super();
        this.addRow([{ text: `🎥  Открыть последний ссыль на ${this.choiceOption}`, callback_data: 'checkLastReply' }]);
        this.addRow([{ text: '📲  Обновить ссыль на зеркало', callback_data: 'sendReq' }]);
        this.addRow([{ text: '🔖  Ссыль не обновляется (репорт)', callback_data: 'createTicket' }]);
        this.addRow([{ text: '<- К предыдущему меню', callback_data: 'movies' }]);
        this.addRow([{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu' }]);
    }
}

class GeneralTaxiMenuKeyboard extends Keyboard {
    constructor() {
        super();
        this.addRow([{ text: '🚖  Двигаемся по городу (Юг)', callback_data: 'taxiSouth'}]);
        this.addRow([{ text: '🚖  Двигаемся по городу (Север)', callback_data: 'taxiNorth'}]);
        this.addRow([{ text: '🚕  Заказываем такси онлайн', callback_data: 'taxiOnline'}]);
        this.addRow([{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu'}]);
    }
}

class SouthTaxiMenuKeyboard extends Keyboard {
    constructor() {
        super();
        this.addRow([{ text: '🚖  Спутник (юг)', callback_data: 'tel:89501974244|Спутник (юг)'}]);
        this.addRow([{ text: '🚖  Регион (юг)',  callback_data: 'tel:89506556526|Регион (юг)'}]);
        this.addRow([{ text: '🚖  Ямщик (юг)', callback_data: 'tel:89043825687|Ямщик (юг)'}]);
        this.addRow([{ text: '🚖  Максим (юг)', callback_data: 'tel:83435041616|Максим (юг)'}]);
        this.addRow([{ text: '🏎  Человек Смита -Втакси-', callback_data: 'tel:+79022725373|человеку Смита'}]);
        this.addRow([{ text: '<- К предыдущему меню', callback_data: 'taxi'}]);
        this.addRow([{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu'}]);
    }
}

class NorthTaxiMenuKeyboard extends Keyboard {
    constructor() {
        super();
        this.addRow([{ text: '🚖  Вояж (север)', callback_data: 'tel:83435053335|Вояж (север)'}]);
        this.addRow([{ text: '🚖  Люкс (север)', callback_data: 'tel:89122206607|Люкс (север)'}]);
        this.addRow([{ text: '🚖  Регион (север)', callback_data: 'tel:89002036253|Регион (север)'}]);
        this.addRow([{ text: '🚖  Штурман (север)', callback_data: 'tel:83435031220|Штурман (север)'}]);
        this.addRow([{ text: '🏎  Человек Смита -Втакси-', callback_data: 'tel:+79022725373|человеку Смита'}]);
        this.addRow([{ text: '<- К предыдущему меню', callback_data: 'taxi'}]);
        this.addRow([{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu'}]);
    }
}

class OnlineTaxiMenuKeyboard extends Keyboard {
    constructor() {
        super();
        this.addRow([{ text: '🚕  Заказ онлайн (tg)', callback_data: 'link:https://t.me/polevskoy_taxi'}]);
        this.addRow([{ text: '🚕  Заказ онлайн 2 (tg)', callback_data: 'link:https://t.me/polevskoytaxi'}]);
        this.addRow([{ text: '🚕  Заказ онлайн 3 (vk)', callback_data: 'link:https://vk.me/join/z45V6aO7t4YiRArHfW7SiRWgr6RDeE_LTG4='}]);
        this.addRow([{ text: '<- К предыдущему меню', callback_data: 'taxi'}]);
        this.addRow([{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu'}]);
    }
}

class AdditionalMenuKeyboard extends Keyboard {
    constructor() {
        super();
        this.addRow([{ text: '🚍 Расписание автобусов 🚍', web_app: {url: frontendLink} }]);
        this.addRow([{ text: '🗳️ Предложить функционал', callback_data: 'suggest'}]);
        this.addRow([{ text: '📬 Пожаловаться на работу бота', callback_data: 'report'}]);
        this.addRow([{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu'}]);
    }
}

export {
    Keyboard,
    MainMenuKeyboard,
    VideoMenuKeyboard,
    VideoChoiceMenuKeyboard,
    GeneralTaxiMenuKeyboard,
    SouthTaxiMenuKeyboard,
    NorthTaxiMenuKeyboard,
    OnlineTaxiMenuKeyboard,
    AdditionalMenuKeyboard
}


// TODO вытащить в отдельный файл? 
export const keyboardForOpeningBot = {
    reply_markup: {
        keyboard: [
            [{ text: 'Открыть бота Макателей' }],
        ],
        resize_keyboard: true,
    }
}