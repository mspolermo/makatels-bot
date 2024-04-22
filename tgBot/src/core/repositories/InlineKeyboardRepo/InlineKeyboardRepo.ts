import { InlineKeyboardMarkup } from "node-telegram-bot-api";
import { InlineButtonsRow } from "../../model/InlineButtonsRow/InlineButtonsRow";

// Методы для имплементации инлайн клавиатур (клавиатур к сообщениям бота)

export interface InlineKeyboardRepo {

    addRow(row: InlineButtonsRow): void;

    getKeyboard(): InlineKeyboardMarkup;

}
