class TaxiDataParser {
    protected dataString: string = '';

    constructor() {}

    handleData(dataString: string) {
        this.dataString = dataString;

        if (this.dataString.startsWith('tel:')) {
            const taxiData = this.dataString.split('|');
            const phoneNumber = taxiData[0].replace('tel:', '');
            const taxiName = taxiData[1];
            return [taxiName, phoneNumber]

        } else if (this.dataString.startsWith('link:')) {
            return this.dataString.replace('link:', '');
        }
    }
}