import { taxiMenuModel } from "../../core/model/TaxiMenuModel/TaxiMenuModel";
import { BotAnswer } from "../../core/model/BotAnswer/BotAnswer";
import { TaxiTypeMenuResponse } from "../../core/services/BotResponses/BotResponses";

interface taxiData {
    msg: string;
    photo: [string, BotAnswer] | undefined;
}

class TaxiDataParser {
    protected taxiData: string = '';

    constructor() {}

    handleData(
        dataString: string
    ): taxiData {
        let taxiDataType: taxiMenuModel;
        let taxiPhotoLink: string;

        this.taxiData = dataString;

        if (this.taxiData.startsWith('tel:')) {
            const taxiData = this.taxiData.split('|');
            const phoneNumber = taxiData[0].replace('tel:', '');
            const taxiName = taxiData[1];

            if (taxiName.includes('юг')) {
                taxiDataType = 'south';
                taxiPhotoLink = './public/south.jpg';
            } else if (taxiName.includes('север')) {
                taxiDataType = 'north';
                taxiPhotoLink = './public/north.jpg';
            } else {
                taxiDataType = 'online';
                taxiPhotoLink = './public/taxi.jpg';
            }

            return {
                msg:  `Набирай ${taxiName}, брат: ${phoneNumber}`,
                photo: [taxiPhotoLink, { ...(TaxiTypeMenuResponse.getResponseViaTaxiType(taxiDataType))}]
            }

        } else {
            return {
                msg:  `Линк на группу: ${this.taxiData.replace('link:', '')}`,
                photo: undefined
            }
        } 
    }
}

export const taxiDataParser = new TaxiDataParser();