import { moviesMirrorModel } from "../../model/MoviesMirrorModel/MoviesMirrorModel";

abstract class BotStateManagerRepository {
    protected state: Record<number, { mirrorType?: moviesMirrorModel; waitingForFeedback?: number }> = {};

    constructor() {
        this.state = {};
    }

    abstract setMirrorType(value: moviesMirrorModel, chatId: number): void;

    abstract isWaitingForFeedback(chatId: number): boolean;

    abstract setWaitingForFeedback(chatId: number): void;

    abstract getMirrorType(chatId: number): moviesMirrorModel | undefined;

    abstract clearWaitingForFeedback(chatId: number): void;

    abstract deleteMessageIfPossible(chatId: number, messageId: number): Promise<void> 
}

export default BotStateManagerRepository;