import { busScheduleType } from "../model/types/types";

// функция возвращает ближайшие маршруты (и в Екб и в Полевской), ближайшеее время регулируется

const NEAREST_TIME = 120;

export function getNearestRoutes (busSchedule: busScheduleType) {
    const currentDate = new Date();
    const currentTime = currentDate.getHours()*60 + currentDate.getMinutes();

    return busSchedule.filter(el => {
        let startHours;
        let startMinutes;

        switch (el.busDirection) {
            case 'toPolevskoy':
                startHours = Number(el.startTime.split(':')[0]);
                startMinutes = Number(el.startTime.split(':')[1]);

                break;
            case 'toEkb':
                startHours = Number(el.startTimeNorth?.split(':')[0]);
                startMinutes = Number(el.startTimeNorth?.split(':')[1]);
        };

        const startTime = startHours*60 + startMinutes;

        if ( (startTime >= currentTime) && (startTime <= currentTime + NEAREST_TIME)){
            return el
        };

    })
};
