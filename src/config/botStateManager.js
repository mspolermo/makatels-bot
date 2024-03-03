export class BotStateManager {
    constructor() {
        this.state = {};
    }

    setMirrorType(value, chatId) {
        this.state[chatId] = { mirrorType: value };
    }

    isWaitingForFeedback(chatId) {
        return this.state[chatId] && this.state[chatId].waitingForFeedback;
    }

    setWaitingForFeedback(value, chatId) {
        this.state[chatId] = { ...this.state[chatId], waitingForFeedback: value };
    }

    getMirrorType(chatId) {
        return this.state[chatId] ? this.state[chatId].mirrorType : '';
    }

    clearWaitingForFeedback(chatId) {
        delete this.state[chatId].waitingForFeedback;
    }
}
