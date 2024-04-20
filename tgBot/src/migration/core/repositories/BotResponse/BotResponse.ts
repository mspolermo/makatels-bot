import { BotAnswer } from "../../model/BotAnswer/BotAnswer";
import { Keyboard } from "../KeyboardRepository/KeyboardRepository";

export abstract class BotResponse {
    protected keyboard: Keyboard;
    protected caption: string;

    constructor(caption: string, keyboard: Keyboard) {
        this.keyboard = keyboard;
        this.caption = caption;
    }

    abstract getResponse(): BotAnswer;
}