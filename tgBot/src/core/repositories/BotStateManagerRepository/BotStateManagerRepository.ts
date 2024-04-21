import { moviesMirrorType } from "../../model/moviesMirrorType/moviesMirrorType";

abstract class BotStateManagerRepository {
    protected state: Record<number, { mirrorType?: moviesMirrorType; waitingForFeedback?: number }> = {};

    constructor() {
        this.state = {};
    }

    abstract setMirrorType(value: moviesMirrorType, chatId: number): void;

    abstract isWaitingForFeedback(chatId: number): boolean;

    abstract setWaitingForFeedback(chatId: number): void;

    abstract getMirrorType(chatId: number): moviesMirrorType | undefined;

    abstract clearWaitingForFeedback(chatId: number): void;

    abstract deleteMessageIfPossible(chatId: number, messageId: number): Promise<void> 
}

export default BotStateManagerRepository;