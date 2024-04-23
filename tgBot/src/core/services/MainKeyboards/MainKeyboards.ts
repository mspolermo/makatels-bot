import { KeyboardButtons } from "../../model/KeyboardButtons/KeyboardButtons";
import { MainKeyboardRepo, MainKeyboardResult } from "../../repositories/MainKeyboardRepo/MainKeyboardRepo";

// Реализация главных пользовательских клавиатур

class MainKeyboard implements MainKeyboardRepo {
    private keyboardButtons: KeyboardButtons[] = [];
    private resize: boolean = true;

    constructor() {
    }

    addRow(row: KeyboardButtons): void {
        this.keyboardButtons.push(row);
    }

    getKeyboard(resize?: boolean): MainKeyboardResult {
        if (resize !== undefined) {
            this.resize = resize;
        }

        return {
            reply_markup: {
                keyboard: this.keyboardButtons,
                resize_keyboard: this.resize,
            }
        }
    }
}

export { MainKeyboard };
