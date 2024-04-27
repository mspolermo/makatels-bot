import { taxiMenuModel } from "../../core/model/TaxiMenuModel/TaxiMenuModel";

type taxiData = TaxiPhoneType | TexiLinkType;

interface TaxiPhoneType {
    taxiType: 'tel';
    taxiData: string;
    taxiName: string;
    taxiDataType: taxiMenuModel;
}

interface TexiLinkType {
    taxiDataType: 'link';
    taxiData: string;
}


class TaxiDataParser {
    protected taxiData: string = '';

    constructor() {}

    handleData(dataString: string): taxiData {
        let taxiDataType: taxiMenuModel;
        this.taxiData = dataString;

        if (this.taxiData.startsWith('tel:')) {
            const taxiData = this.taxiData.split('|');
            const phoneNumber = taxiData[0].replace('tel:', '');
            const taxiName = taxiData[1];

            if (taxiName.includes('юг')) {
                taxiDataType = 'south';
            } else if (taxiName.includes('север')) {
                taxiDataType = 'north'
            } else {
                taxiDataType = 'online'
            }


            return {
                taxiType: 'tel',
                taxiName: taxiName, 
                taxiData: phoneNumber,
                taxiDataType
            }
        } else {
            return {
                taxiDataType: 'link', 
                taxiData: this.taxiData.replace('link:', '')
            }
        } 
    }
}

export const taxiDataParser = new TaxiDataParser();