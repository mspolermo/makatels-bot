//TODO переделать на нормальные импорты


import { BotStateManager } from '../system/settings/botStateManager';
import { moviesMirrorType, taxiMenuType } from '../types/types';
import { AdditionalMenuResponse, FilmsGeneralMenuResponse, FilmsMirrorMenuResponse, InitialMessageResponse, TaxiGeneralMenuResponse, TaxiTypeMenuResponse } from './answers';

export enum MessageType {
    InitialMessage,
    FilmsGeneralMenu,
    TaxiGeneralMenu,
    AdditionalMenu,
    FilmsMirrorMenu,
    TaxiTypeMenu
}

export class MenuResponseFactory {
    public getMessageType(data: string): MessageType {
        switch (data) {
            case 'movies':
                return MessageType.FilmsGeneralMenu;
            case 'taxi':
                return MessageType.TaxiGeneralMenu;
            case 'additional':
                return MessageType.AdditionalMenu;
            case 'kinoland':
            case 'hdrezka':
                return MessageType.FilmsMirrorMenu;
            case 'taxiOnline':
            case 'taxiSouth':
            case 'taxiNorth':
                return MessageType.TaxiTypeMenu;
            default:
                return MessageType.InitialMessage;
        }
    }

    public createMenuResponse(type: MessageType, data: string, chatId: number, botStateManager: BotStateManager): any {
        switch (type) {
            case MessageType.InitialMessage:
                return (new InitialMessageResponse()).getResponse();
            case MessageType.FilmsGeneralMenu:
                return (new FilmsGeneralMenuResponse()).getResponse();
            case MessageType.TaxiGeneralMenu:
                return (new TaxiGeneralMenuResponse()).getResponse();
            case MessageType.AdditionalMenu:
                return (new AdditionalMenuResponse()).getResponse();
            case MessageType.FilmsMirrorMenu:
                return (new FilmsMirrorMenuResponse(data as moviesMirrorType, chatId, botStateManager.setMirrorType.bind(botStateManager))).getResponse();
            case MessageType.TaxiTypeMenu:
                return (new TaxiTypeMenuResponse(data as taxiMenuType)).getResponse();
            default:
                return null;
        }
    }
}