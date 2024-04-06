export interface busRouteToEkbType extends busRouteType {
    busDirection: 'toEkb';
    startCity: polevskoyCity;
    startTimeSouth: string | null;
    startTimeNorth: string;
    finishTme: string;
}

export interface busRouteToPolevskoyType extends busRouteType {
    busDirection: 'toPolevskoy';
    finishCity: polevskoyCity;
    startTime: string;
    finishTimeSouth: string | null;
    finishTimeNorth: string;
}

interface busRouteType {
    busNumber: string;
    busDirection: busDirectionType;
    days: string;
}

export type busDirectionType = 'toEkb' | 'toPolevskoy';

type polevskoyCity = 'Полевской' | 'Северский';
