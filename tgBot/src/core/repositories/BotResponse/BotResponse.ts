import { BotAnswer } from "../../model/BotAnswer/BotAnswer";
import { InlineKeyboardRepo } from "../InlineKeyboardRepo/InlineKeyboardRepo";

export abstract class BotResponse {
    protected keyboard: InlineKeyboardRepo;
    protected caption: string;

    constructor(caption: string, keyboard: InlineKeyboardRepo) {
        this.keyboard = keyboard;
        this.caption = caption;
    }

    abstract getResponse(): BotAnswer;
}