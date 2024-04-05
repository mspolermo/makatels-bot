import cheerio from 'cheerio';
import { busDirectionType } from '../model/types/types';

export function parseBusSchedule(html: string, direction: busDirectionType) {
    const $ = cheerio.load(html);
    const busSchedule = [`Информация актуальна ${$('div.block.rasp.r_for').text().trim()}`];

    if (direction === 'directly') {
        $('tr').each((index, element) => {
            const columns = $(element).find('td');

            const busNumber = $(columns[0]).text().trim();
            const departureTime = $(columns[1]).text().trim();
            const arrivalTime = $(columns[2]).text().trim();
            const days = $(columns[8]).text().trim();

            if (Number(busNumber) === 0 || isNaN(Number(busNumber))) return;
            if (days === 'отменён') return;

            if (busNumber === '145') {
                busSchedule.push(`${departureTime}. Полевской - Екб(${busNumber}, ${days}). Выезд(север): ${arrivalTime}`);
            } else {
                busSchedule.push(`${arrivalTime}. Северский - Екб(${busNumber}, ${days})`);
            }
        });
    }

    if (direction === 'inverted') {
        $('tr').each((index, element) => {
            const columns = $(element).find('td');

            const busNumber = $(columns[4]).text().trim();
            const departureTime = $(columns[5]).text().trim();
            const days = $(columns[8]).text().trim();
            const finalCity = busNumber === '145' ? 'Полевской' : 'Северский';

            if (Number(busNumber) === 0 || isNaN(Number(busNumber))) return;
            if (days === 'отменён') return;

            busSchedule.push(`${departureTime}. Екб - ${finalCity}(${busNumber}, ${days})`);
        });
    }

    return busSchedule.join('\n\n');
}