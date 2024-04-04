import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get('https://html-parser-tau.vercel.app/'); // Замените URL на адрес вашего сервера и путь к эндпоинту
    console.log(response.data); // Вывод данных в консоль
    return response.data; // Возврат данных из функции
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw error;
  }
};