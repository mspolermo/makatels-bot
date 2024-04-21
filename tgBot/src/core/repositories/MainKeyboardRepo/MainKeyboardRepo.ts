import { KeyboardButtons } from "../../model/KeyboardButtons/KeyboardButtons";

export abstract class MainKeyboardRepo {
    protected keyboardButtons: KeyboardButtons[] = [];
    protected resize: boolean;

    constructor(resize: boolean) {
        this.resize = resize;
    }

    public addRow(row: KeyboardButtons): void {
        this.keyboardButtons.push(row);
    }

    public getKeyboard() {
        return {
            reply_markup: {
                keyboard: this.keyboardButtons,
                resize_keyboard: this.resize,
            }
        }
    }
}