import { moviesMirrorModel } from "../../model/MoviesMirrorModel/MoviesMirrorModel";
import BotStateManagerRepository from "../../repositories/BotStateManagerRepository/BotStateManagerRepository";

export class BotStateManager extends BotStateManagerRepository {
    protected state: Record<number, { mirrorType?: moviesMirrorModel; waitingForFeedback?: number }> = {};

    // constructor() {
    //     super()
    //     this.state = {};
    // }

    // Установка типа зеркала для чата
    setMirrorType(value: moviesMirrorModel, chatId: number): void {
        if (!this.state[chatId]) {
            this.state[chatId] = {};
        }
        this.state[chatId].mirrorType = value;
    }

    // Проверка ожидания обратной связи для чата
    isWaitingForFeedback(chatId: number): boolean {
        return !!this.state[chatId]?.waitingForFeedback;
    }

    // Установка флага ожидания обратной связи для чата
    setWaitingForFeedback(chatId: number): void {
        if (!this.state[chatId]) {
            this.state[chatId] = {};
        }
        this.state[chatId].waitingForFeedback = chatId;
    }

    // Получение типа зеркала для чата
    getMirrorType(chatId: number): moviesMirrorModel | undefined {
        return this.state[chatId]?.mirrorType;
    }

    // Очистка флага ожидания обратной связи для чата
    clearWaitingForFeedback(chatId: number): void {
        if (this.state[chatId]) {
            delete this.state[chatId].waitingForFeedback;
            if (Object.keys(this.state[chatId]).length === 0) {
                delete this.state[chatId];
            }
        }
    }
        // Метод удаления сообщения, если это возможно
        async deleteMessageIfPossible(chatId: number, messageId: number): Promise<void> {
            try {
                // Ваш код удаления сообщения
            } catch (error) {
                console.error('Error deleting message:', error);
                // Обработка ошибки при удалении сообщения
            }
        }
}