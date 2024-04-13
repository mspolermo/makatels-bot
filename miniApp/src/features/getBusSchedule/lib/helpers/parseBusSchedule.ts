import cheerio from 'cheerio';

import { busDirectionType, busRouteToEkbType, busRouteToPolevskoyType } from '@/entities/busRoute';

import { busScheduleType } from '../../model/types/types';

//Функция переработки HTML разметки сайта в массив объектов расписания автобусов

export function parseBusSchedule(html: string, direction: busDirectionType) {
    const $ = cheerio.load(html);
    const busScheduleArray: busScheduleType = [];

    $('tr').each((_, element) => {

        const columns = $(element).find('td');
        const startCell = $(columns[0]).text().trim();
        const routeDays = $(columns[8]).text().trim();

        if (Number(startCell) === 0 || isNaN(Number(startCell))) return; //проверка что парсинг начинается с нужной первой ячейки таблицы, после всех заголовсков (где указан автобусный маршрут номер 145)
        if (routeDays === 'отменён') return; // не учитываем отмененные маршруты

        if (direction === 'toEkb') {
            
            const busNumber = $(columns[0]).text().trim();
            const startTimeSouth = $(columns[1]).text().trim();
            const startTimeNorth = $(columns[2]).text().trim();
            const finishTime = $(columns[3]).text().trim();
            
            const busRoute: busRouteToEkbType = {
                busDirection: direction,
                busNumber: busNumber,
                days: routeDays,
                startCity: (busNumber == '145') ? 'Полевской' : 'Северский',
                startTimeSouth: (busNumber == '145') ? startTimeSouth : null,
                startTimeNorth: startTimeNorth,
                finishTme: finishTime
            };

            busScheduleArray.push(busRoute);
        } else if (direction === 'toPolevskoy') {

            const busNumber = $(columns[4]).text().trim();
            const departureTime = $(columns[5]).text().trim();
            const finishTimeNorth = $(columns[6]).text().trim();
            const finishTimeSouth = $(columns[7]).text().trim();


            const busRoute: busRouteToPolevskoyType = {
                busDirection: direction,
                busNumber: busNumber,
                days: routeDays,
                startTime: departureTime,
                finishCity: (busNumber === '145') ? 'Полевской' : 'Северский',
                finishTimeNorth: finishTimeNorth,
                finishTimeSouth: (busNumber === '145') ? finishTimeSouth : null
            };

            busScheduleArray.push(busRoute);
        };
    });

    return busScheduleArray;
}
