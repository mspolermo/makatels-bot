// TODO переделать

import { moviesMirrorModel } from '../../core/model/MoviesMirrorModel/MoviesMirrorModel';
import { BotStateManager } from '../../core/services/BotStateManager/BotStateManager';
import { taxiMenuModel } from '../../core/model/TaxiMenuModel/TaxiMenuModel';
import { 
    AdditionalMenuResponse,
    FilmsGeneralMenuResponse,
    FilmsMirrorMenuResponse,
    InitialMessageResponse,
    TaxiGeneralMenuResponse,
    TaxiTypeMenuResponse
} from '../../core/services/BotResponses/BotResponses';

let mt = '';

export class MenuResponseFactory {
    private botStateManager: BotStateManager;

    constructor(botStateManager: BotStateManager) {
        this.botStateManager = botStateManager;
    }

    public getMessageType(data: string): string {
        console.log('!!! data = ', data);
        switch (data) {
            case 'movies':
                mt = 'FilmsGeneralMenu';
                return 'FilmsGeneralMenu';
            case 'taxi':
                return 'TaxiGeneralMenu';
            case 'additional':
                return 'AdditionalMenu';
            case 'kinoland':
            case 'hdrezka':
                return 'FilmsMirrorMenu';
            case 'taxiOnline':
            case 'taxiSouth':
            case 'taxiNorth':
                return 'TaxiTypeMenu';
            default:
                return 'InitialMessage';
        }
    }

    public createMenuResponse(type: string, data: any, chatId: number): any {
        console.log('Creating menu...');
        console.log(type);

        switch (type) {
            case 'InitialMessage':
                return this.getInitialMessage();
            case 'FilmsGeneralMenu':
                return (new FilmsGeneralMenuResponse()).getResponse();
            case 'TaxiGeneralMenu':
                return (new TaxiGeneralMenuResponse()).getResponse();
            case 'AdditionalMenu':
                return (new AdditionalMenuResponse()).getResponse();
            case 'FilmsMirrorMenu':
                return (new FilmsMirrorMenuResponse(data as moviesMirrorModel, chatId, this.botStateManager.setMirrorType.bind(this.botStateManager))).getResponse();
            case 'TaxiTypeMenu':
                return (new TaxiTypeMenuResponse(data as taxiMenuModel)).getResponse();
            default:
                return null;
        }
    }

    public getInitialMessage(): any {
        return (new InitialMessageResponse()).getResponse();
    }
}