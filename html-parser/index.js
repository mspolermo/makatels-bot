import express from 'express';
import cors from 'cors';
import axios from 'axios';

const PORT = 5000;
const BUS_TABLE_URL = 'http://polevskoybus.ru/index/120_122_145_raspisanie/0-194';

const app = express();
app.use(cors());

app.listen(PORT, () => console.log('Server started on port: ' + PORT));

// Роут для обработки запроса с фронта
app.get('/', async (req, res) => {
    try {
        const busTable = await getHTML(BUS_TABLE_URL); 
        res.send(busTable);
    } catch (error) {
        console.error('Произошла ошибка при получении расписания автобусов:', error);
        res.status(500).send('Произошла ошибка при получении расписания автобусов');
    }
});


// Парсинг HTML-разметки сайта с расписанием автобусов
async function getHTML(url) {
    try {
        const response = await axios.get(url);
        if (response.status !== 200) {
            throw new Error('Не удалось получить HTML разметку');
        }
        return response.data;
    } catch (error) {
        console.log('Ошибка при получении HTML разметки:', (error).message);
        return '';
    }
};
