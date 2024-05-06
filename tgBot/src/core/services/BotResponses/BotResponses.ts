import {  InlineKeyboardMarkup } from "node-telegram-bot-api";

import { BotAnswer } from "../../model/BotAnswer/BotAnswer";
import { moviesMirrorModel } from "../../model/MoviesMirrorModel/MoviesMirrorModel";
import { taxiMenuModel } from "../../model/TaxiMenuModel/TaxiMenuModel";
import { InlineKeyboardRepo } from "../../repositories/InlineKeyboardRepo/InlineKeyboardRepo";
import { BotResponseRepo } from "../../repositories/BotResponseRepo/BotResponseRepo";
import {
    AdditionalMenuKeyboard,
    GeneralTaxiMenuKeyboard,
    MainMenuKeyboard,
    NorthTaxiMenuKeyboard,
    OnlineTaxiMenuKeyboard,
    SouthTaxiMenuKeyboard,
    VideoChoiceMenuKeyboard,
    VideoMenuKeyboard
} from "../InlineKeyboards/InlineKeyboards";

// Реализация класса создания сообщений бота (заголовок с инлайн-клавиатурой)

class InitialResponse implements BotResponseRepo {
    protected caption: string;
    protected replyMarkup: InlineKeyboardMarkup;

    constructor(caption: string, keyboard:InlineKeyboardRepo) {
        this.caption = caption;
        this.replyMarkup = keyboard.getKeyboard();
    }

    getResponse(): BotAnswer {
        return new BotAnswer(this.caption, this.replyMarkup);
    }
}

// Расширенные классы с функцией апдейта (для типа видеосервисов и такси)

class FilmsMirrorMenuResponse extends InitialResponse {

    constructor(caption: moviesMirrorModel, keyboard:InlineKeyboardRepo) {
        super(caption, keyboard)
    }

    getResponseViaMoviesMirrorType(
        site: moviesMirrorModel, 
        chatId: number, 
        setFunction: Function
    ) {
        this.caption = `${site.toUpperCase()}:`;
        this.replyMarkup = VideoChoiceMenuKeyboard.getResponseViaMoviesMirror(site)
        setFunction(site, chatId);
        return this.getResponse();
    }
}

class TaxiTypeMenuResponse extends InitialResponse {
    private type:taxiMenuModel = 'south';

    constructor(caption: taxiMenuModel, keyboard:InlineKeyboardRepo) {
        super(caption, keyboard)
    }

    private setCaption(): void {
        switch (this.type) {
            case 'south':
                this.caption = 'Полевские такси (юг):';
                break;
            case 'north':
                this.caption = 'Полевские такси (север):';
                break;
            case 'online':
                this.caption = 'Заказать такси онлайн:';
                break;
            default:
                break;
        }
    }

    private setKeyboard(): void {
        let taxiKeyboard: InlineKeyboardRepo | undefined;

        switch(this.type) {
            case 'south':
                taxiKeyboard = SouthTaxiMenuKeyboard;
                break;
            case 'north':
                taxiKeyboard = NorthTaxiMenuKeyboard;
                break;
            case 'online':
                taxiKeyboard = OnlineTaxiMenuKeyboard;
                break;
            default:
                break;
        }

        if (taxiKeyboard) {
            this.replyMarkup = taxiKeyboard.getKeyboard();
        }
    }

    getResponseViaTaxiType(type:taxiMenuModel) {
        this.type = type;
        this.setCaption();
        this.setKeyboard();
        return this.getResponse()
    }

}

// Экспорты готовых сообщений бота с инлайн-клавиатурами

export const InitialMenu = new InitialResponse(
    "MAKATEL'S BOT SERVICES", MainMenuKeyboard
);

export const MoviesGeneralMenu = new InitialResponse(
    "MAKATEL'S BOT VIDEO SERVICE", VideoMenuKeyboard
);

export const TaxiGeneralMenu = new InitialResponse(
    "MAKATEL'S BOT TAXI SERVICE", GeneralTaxiMenuKeyboard
);

export const AdditionalMenu = new InitialResponse(
    "MAKATEL'S BOT ADDITIONAL SERVICES", AdditionalMenuKeyboard
);

export const MoviesMirrorMenu = new FilmsMirrorMenuResponse(
    'hdrezka', VideoChoiceMenuKeyboard
); // с данными по-умолчанию

export const TaxiTypeMenu = new TaxiTypeMenuResponse(
    'south', SouthTaxiMenuKeyboard
); // с данными по-умолчанию
