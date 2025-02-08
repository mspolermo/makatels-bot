import { InlineKeyboard, InlineButtonsRow } from "../../model/InlineButtonsRow/InlineButtonsRow";
import { frontendLink, frontendVueLink } from "../../../config/config";
import { moviesMirrorModel } from "../../model/MoviesMirrorModel/MoviesMirrorModel";
import { InlineKeyboardRepo } from "../../repositories/InlineKeyboardRepo/InlineKeyboardRepo";

// Реализация класса создания инлайн клавиатур (к сообщениям)
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

// Расширенный класс для получения меню видеосервисов
class VideoChoiceInlineKeyboardClas extends InlineKeyboardClass {

    constructor(keyboardData: InlineButtonsRow[]) {
        super(keyboardData);
    }

    getResponseViaMoviesMirror (choiceOption: moviesMirrorModel) {

        const modifiedRows: InlineButtonsRow[] = this.keyboard.map(row => {
            return row.map(button => {
                return {
                    ...button,
                    text: button.text.replace(/ТИП_ЗЕРКАЛА/g, choiceOption.toUpperCase())
                };
            });
        });

        return { inline_keyboard: modifiedRows};
    }
}

// Экспорты готовых инлайн-клавиатур

export const MainMenuKeyboard = new InlineKeyboardClass([
    [{ text: '🎬  Видео', callback_data: 'movies' }],
    [{ text: '🚕 Такси', callback_data: 'taxi' }],
    [{ text: '📰  Другое', callback_data: 'additional' }]
]);

export const VideoMenuKeyboard = new InlineKeyboardClass([
    [{ text: '🎬  KINOLAND', callback_data: 'kinoland' }],
    [{ text: '🎬  HDREZKA', callback_data: 'hdrezka' }],
    [{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu' }]
]);

export const GeneralTaxiMenuKeyboard = new InlineKeyboardClass([
    [{ text: '🚖  Двигаемся по городу (Юг)', callback_data: 'taxiSouth'}],
    [{ text: '🚖  Двигаемся по городу (Север)', callback_data: 'taxiNorth'}],
    [{ text: '🚕  Заказываем такси онлайн', callback_data: 'taxiOnline'}],
    [{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu'}]
]);

export const SouthTaxiMenuKeyboard = new InlineKeyboardClass([
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

export const NorthTaxiMenuKeyboard = new InlineKeyboardClass([
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

export const OnlineTaxiMenuKeyboard = new InlineKeyboardClass([
    [{ text: '🚕  Заказ онлайн (tg)', callback_data: 'link:https://t.me/polevskoy_taxi'}],
    [{ text: '🚕  Заказ онлайн 2 (tg)', callback_data: 'link:https://t.me/polevskoytaxi'}],
    [{ text: '🚕  Заказ онлайн 3 (vk)', callback_data: 'link:https://vk.me/join/z45V6aO7t4YiRArHfW7SiRWgr6RDeE_LTG4='}],
    [{ text: '🏎  Человек Смита -Втакси-', callback_data: 'tel:+79022725373|человеку Смита'}],
    [{ text: '<- К предыдущему меню', callback_data: 'taxi'}],
    [{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu'}]
]);

export const AdditionalMenuKeyboard = new InlineKeyboardClass([
    [{ text: '🚍 Расписание автобусов 🚍', web_app: {url: frontendVueLink} }],
    [{ text: '🚍 Расписание автобусов (Old) 🚍', web_app: {url: frontendLink} }],
    [{ text: '🗳️ Предложить функционал', callback_data: 'suggest'}],
    [{ text: '📬 Пожаловаться на работу бота', callback_data: 'report'}],
    [{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu'}]
]);

export const VideoChoiceMenuKeyboard = new VideoChoiceInlineKeyboardClas([
    [{ text: `🎥  Открыть последний ссыль на ТИП_ЗЕРКАЛА`, callback_data: 'checkLastReply' }],
    [{ text: '📲  Обновить ссыль на зеркало', callback_data: 'sendReq' }],
    [{ text: '🔖  Ссыль не обновляется (репорт)', callback_data: 'createTicket' }],
    [{ text: '<- К предыдущему меню', callback_data: 'movies' }],
    [{ text: '<-- Вернуться в главное меню', callback_data: 'mainMenu' }],
])

export const OpenFrontendKeyboard = new InlineKeyboardClass([
    [{ text: '🚍 Расписание автобусов 🚍', web_app: {url: frontendLink} }]
])