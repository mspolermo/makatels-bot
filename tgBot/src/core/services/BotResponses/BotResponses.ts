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

// Реализация "Сообщения бота" (заголовок с инлайн-клавиатурой)

class InitialMessageResponse implements BotResponseRepo {
    private readonly caption: string;
    private readonly replyMarkup: InlineKeyboardMarkup;

    constructor() {
        this.caption = "MAKATEL'S BOT SERVICES";
        this.replyMarkup = new MainMenuKeyboard().getKeyboard();
    }

    getResponse(): BotAnswer {
        return new BotAnswer(this.caption, this.replyMarkup);
    }
}

class FilmsGeneralMenuResponse implements BotResponseRepo {
    private readonly caption: string;
    private readonly replyMarkup: InlineKeyboardMarkup;

    constructor() {
        this.caption = "MAKATEL'S BOT VIDEO SERVICE";
        this.replyMarkup = new VideoMenuKeyboard().getKeyboard()
    }

    getResponse(): BotAnswer {
        return new BotAnswer(this.caption, this.replyMarkup);
    }
}

class FilmsMirrorMenuResponse implements BotResponseRepo {
    private readonly caption: string;
    private readonly replyMarkup: InlineKeyboardMarkup;

    constructor( 
        private site: moviesMirrorModel, 
        private chatId: number, 
        private setFunction: Function
    ) {
        this.caption = `${site.toUpperCase()}:`;
        this.replyMarkup = new VideoChoiceMenuKeyboard(this.site).getKeyboard();
        this.setFunction(site, chatId);
    }

    getResponse(): BotAnswer {
        return new BotAnswer(this.caption, this.replyMarkup);
    }
}

class TaxiGeneralMenuResponse implements BotResponseRepo {
    private readonly caption: string;
    private readonly replyMarkup: InlineKeyboardMarkup;

    constructor() {
        this.caption = `MAKATEL'S BOT TAXI SERVICE`;
        this.replyMarkup = new GeneralTaxiMenuKeyboard().getKeyboard();
    }

    getResponse(): BotAnswer {
        return new BotAnswer(this.caption, this.replyMarkup);
    }
}

class TaxiTypeMenuResponse implements BotResponseRepo {
    private caption: string = '';
    private replyMarkup: InlineKeyboardMarkup = { inline_keyboard: [] };

    constructor(private type: taxiMenuModel) {
        this.setCaption();
        this.setKeyboard();
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
                taxiKeyboard = new SouthTaxiMenuKeyboard();
                break;
            case 'north':
                taxiKeyboard = new NorthTaxiMenuKeyboard();
                break;
            case 'online':
                taxiKeyboard = new OnlineTaxiMenuKeyboard();
                break;
            default:
                break;
        }

        if (taxiKeyboard) {
            this.replyMarkup = taxiKeyboard.getKeyboard();
        }
    }

    getResponse(): BotAnswer {
        return new BotAnswer(this.caption, this.replyMarkup);
    }
}

class AdditionalMenuResponse implements BotResponseRepo {
    private readonly caption: string;
    private readonly replyMarkup: InlineKeyboardMarkup;

    constructor() {
        this.caption = `MAKATEL'S BOT ADDITIONAL SERVICES`;
        this.replyMarkup = new AdditionalMenuKeyboard().getKeyboard();
    }

    getResponse(): BotAnswer {
        return new BotAnswer(this.caption, this.replyMarkup);
    }
}

export {
    InitialMessageResponse,
    FilmsGeneralMenuResponse,
    FilmsMirrorMenuResponse,
    TaxiGeneralMenuResponse,
    TaxiTypeMenuResponse,
    AdditionalMenuResponse
};