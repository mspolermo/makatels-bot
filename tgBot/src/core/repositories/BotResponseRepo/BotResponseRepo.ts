import { BotAnswer } from "../../model/BotAnswer/BotAnswer";

// Методы для имплементации сообщений бота

export interface BotResponseRepo {
    getResponse(): BotAnswer;
}
