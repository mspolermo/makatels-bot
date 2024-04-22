// Модель пользовательской клавиатуры

class KeyboardButton {
    constructor(
        readonly text: string,
        readonly resize: boolean
    ) {}
}

export type KeyboardButtons = KeyboardButton[];
