// Модель инлайн клавиатуры с кнопками (для сообщений, отправляемых ботом)

class InlineButton {
    constructor(
        readonly text: string,
        readonly callback_data?: string,
        readonly web_app?: {
            url: string;
        }
    ) {}
}

export type InlineButtonsRow = InlineButton[];

export interface InlineKeyboard {
    inline_keyboard: InlineButtonsRow []
}
