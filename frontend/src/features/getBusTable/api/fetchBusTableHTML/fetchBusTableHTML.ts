import axios from 'axios';
import cheerio from 'cheerio';
import { busDirectionType } from '../../model/types/types';

const BUS_TABLE_URL = 'http://polevskoybus.ru/index/120_122_145_raspisanie/0-194';

// Функция получения расписания автобусов
export async function getBusTable(direction: busDirectionType) {
    try {
        const html = await getHTML(BUS_TABLE_URL);
        return parseBusTable(html, direction);
    } catch (error) {
        console.error('Произошла ошибка при получении расписания автобусов:', error);
        throw error;
    }
};

// Функция получения HTML-разметки сайта с расписанием автобусов
async function getHTML(url: string) {
    try {
        const response = await axios.get(url);
        if (response.status !== 200) {
            throw new Error('Не удалось получить HTML разметку');
        }
        return response.data;
    } catch (error) {
        console.log('Ошибка при получении HTML разметки:', (error as Error ).message);
        return '';
    }
};

// Функция переработки HTML-разметки в расписание автобусов
function parseBusTable(html: string, direction: busDirectionType) {
    const $ = cheerio.load(html);
    const buses = [`Информация актуальна ${$('div.block.rasp.r_for').text().trim()}`];

    if (direction == 'directly') {
        $('tr').each((index, element) => {
                const columns = $(element).find('td');

                const busNumber = $(columns[0]).text().trim();
                const timeStart = $(columns[1]).text().trim();
                const timeSecond = $(columns[2]).text().trim();
                const days = $(columns[8]).text().trim();

                if (Number(busNumber) === 0 || isNaN(Number(busNumber))) return;
                if (days=='отменён') return;

                if (busNumber == '145') {
                    buses.push(`${timeStart}. Полевской - Екб(${busNumber}, ${days}). Выезд(север): ${timeSecond}`)
                } else {
                    buses.push(`${timeSecond}. Северский - Екб(${busNumber}, ${days})`)
                }
            
        });
    };

    if (direction == 'inverted') {
        $('tr').each((index, element) => {
            const columns = $(element).find('td');

            const busNumber = $(columns[4]).text().trim();
            const timeStart = $(columns[5]).text().trim();
            const days = $(columns[8]).text().trim();
            const finalCity = busNumber == '145' ? 'Полевской' : 'Северский'

            if (Number(busNumber) === 0 || isNaN(Number(busNumber))) return;
            if (days=='отменён') return;

            buses.push(`${timeStart}. Екб - ${finalCity}(${busNumber}, ${days})`)
        
        });
    };

    return buses.join('\n\n');
};