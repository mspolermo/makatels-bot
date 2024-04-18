import { InlineKeyboardMarkup, InlineKeyboardButton } from 'node-telegram-bot-api';
import { moviesMirrorType, taxiMenuType } from '../types/types';
import {
    MainMenuKeyboard,
    VideoMenuKeyboard,
    VideoChoiceMenuKeyboard,
    GeneralTaxiMenuKeyboard,
    SouthTaxiMenuKeyboard,
    NorthTaxiMenuKeyboard,
    OnlineTaxiMenuKeyboard,
    AdditionalMenuKeyboard,
    Keyboard
} from './keyboards';

interface BotAnswer {
    caption: string;
    reply_markup: InlineKeyboardMarkup;
}

abstract class BotResponse {
    protected keyboard: Keyboard;
    protected caption: string;

    constructor(caption: string, keyboard: Keyboard) {
        this.keyboard = keyboard;
        this.caption = caption;
    }

    abstract getResponse(): BotAnswer;
}

// Реализация

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
        let taxiKeyboard: Keyboard;

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