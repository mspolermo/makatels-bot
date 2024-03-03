import { moviesMirrorType } from "../../types/types";

export class BotStateManager {
    private state: Record<number, { mirrorType?: moviesMirrorType; waitingForFeedback?: number }> = {};

    constructor() {
        this.state = {};
    }

    // Установка типа зеркала для чата
    setMirrorType(value: moviesMirrorType, chatId: number) {
        if (!this.state[chatId]) {
            this.state[chatId] = {};
        }
        this.state[chatId].mirrorType = value;
    }

    // Проверка ожидания обратной связи для чата
    isWaitingForFeedback(chatId: number) {
        return this.state[chatId] && this.state[chatId].waitingForFeedback;
    }

    // Установка флага ожидания обратной связи для чата
    setWaitingForFeedback(chatId: number) {
        if (!this.state[chatId]) {
            this.state[chatId] = {};
        }
        this.state[chatId].waitingForFeedback = chatId;
    }

    // Получение типа зеркала для чата
    getMirrorType(chatId: number) {
        return this.state[chatId]?.mirrorType;
    }

    // Очистка флага ожидания обратной связи для чата
    clearWaitingForFeedback(chatId: number) {
        if (this.state[chatId]) {
            delete this.state[chatId].waitingForFeedback;
            if (Object.keys(this.state[chatId]).length === 0) {
                delete this.state[chatId];
            }
        }
    }
}
