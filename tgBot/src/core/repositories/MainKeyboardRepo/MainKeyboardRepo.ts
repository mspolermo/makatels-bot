import { KeyboardButtons } from "../../model/KeyboardButtons/KeyboardButtons";

export interface MainKeyboardRepo {
    addRow(row: KeyboardButtons): void,
    getKeyboard(resize?: boolean): void
}

// Методы для имплементации главных пользовательских клавиатур 

export interface MainKeyboardResult {
    reply_markup: {
        keyboard: KeyboardButtons[],
        resize_keyboard: boolean,
    }
}
