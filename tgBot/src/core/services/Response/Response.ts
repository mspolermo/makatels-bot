import { InlineKeyboardButton } from "node-telegram-bot-api";
import { BotAnswer } from "../../model/BotAnswer/BotAnswer";
import { moviesMirrorType } from "../../model/moviesMirrorType/moviesMirrorType";
import { BotResponse } from "../../repositories/BotResponse/BotResponse";
import { AdditionalMenuKeyboard, GeneralTaxiMenuKeyboard, MainMenuKeyboard, NorthTaxiMenuKeyboard, OnlineTaxiMenuKeyboard, SouthTaxiMenuKeyboard, VideoChoiceMenuKeyboard, VideoMenuKeyboard } from "../InlineKeyboards/InlineKeyboards";
import { taxiMenuType } from "../../model/taxiMenuType/taxiMenuType";
import { InlineKeyboardRepo } from "../../repositories/InlineKeyboardRepo/InlineKeyboardRepo";

class InitialMessageResponse extends BotResponse {
    constructor() {
        super(`MAKATEL'S BOT SERVICES`, new MainMenuKeyboard());
    }

    getResponse(): BotAnswer {
        return {
            caption: this.caption,
            reply_markup: {
                inline_keyboard: this.keyboard.getKeyboard()
            }
        };
    }
}

class FilmsGeneralMenuResponse extends BotResponse {
    constructor() {
        super(`MAKATEL'S BOT VIDEO SERVICE`, new VideoMenuKeyboard());
    }

    getResponse(): BotAnswer {
        return {
            caption: this.caption,
            reply_markup: {
                inline_keyboard: this.keyboard.getKeyboard()
            }
        };
    }
}

class FilmsMirrorMenuResponse extends BotResponse {

    constructor( 
        private site: moviesMirrorType, 
        private chatId: number, 
        private setFunction: Function
    ) {
        super(`${site.toUpperCase()}:`, new VideoChoiceMenuKeyboard(site));
        this.setFunction(site, chatId);
    }

    getResponse(): BotAnswer {
        const inlineKeyboard: InlineKeyboardButton[][] = this.keyboard.getKeyboard().map(row => row.map(item => ({ text: item.text, callback_data: item.callback_data })));

        return {
            caption: this.caption,
            reply_markup: {
                inline_keyboard: inlineKeyboard
            }
        };
    }
}

class TaxiGeneralMenuResponse extends BotResponse {
    constructor() {
        super(`MAKATEL'S BOT TAXI SERVICE`, new GeneralTaxiMenuKeyboard());
    }

    getResponse(): BotAnswer {
        return {
            caption: this.caption,
            reply_markup: {
                inline_keyboard: this.keyboard.getKeyboard()
            }
        };
    }
}

class TaxiTypeMenuResponse extends BotResponse {

    constructor(private type: taxiMenuType) {
        let taxiKeyboard: InlineKeyboardRepo;

        switch(type) {
            case 'south':
                taxiKeyboard = new SouthTaxiMenuKeyboard();
                break;
            case 'north':
                taxiKeyboard = new NorthTaxiMenuKeyboard();
                break;
            case 'online':
                taxiKeyboard = new OnlineTaxiMenuKeyboard();
                break;
        }

        super('', taxiKeyboard); // Вызываем конструктор базового класса

        // Устанавливаем caption и keyboard после вызова super()
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
        switch (this.type) {
            case 'south':
                this.keyboard = new SouthTaxiMenuKeyboard();
                break;
            case 'north':
                this.keyboard = new NorthTaxiMenuKeyboard();
                break;
            case 'online':
                this.keyboard = new OnlineTaxiMenuKeyboard();
                break;
            default:
                break;
        }
    }

    getResponse(): BotAnswer {
        return {
            caption: this.caption,
            reply_markup: {
                inline_keyboard: this.keyboard.getKeyboard()
            }
        };
    }
}

class AdditionalMenuResponse extends BotResponse {
    constructor() {
        super(`MAKATEL'S BOT ADDITIONAL SERVICES`, new AdditionalMenuKeyboard());
    }

    getResponse(): BotAnswer {
        return {
            caption: this.caption,
            reply_markup: {
                inline_keyboard: this.keyboard.getKeyboard()
            }
        };
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