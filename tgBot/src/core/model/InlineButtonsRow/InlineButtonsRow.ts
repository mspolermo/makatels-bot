interface InlineButton {
    text: string;
    callback_data?: string;
    web_app?: {
        url: string;
    };
}

export type InlineButtonsRow = InlineButton[];
