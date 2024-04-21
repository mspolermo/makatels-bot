import { MainKeyboardRepo } from "../../repositories/MainKeyboardRepo/MainKeyboardRepo";

class MainKeyboard extends MainKeyboardRepo {
    constructor() {
        super(true);
        this.addRow([{ text: 'Открыть бота Макателей' }]);
    }
}

export { MainKeyboard };
