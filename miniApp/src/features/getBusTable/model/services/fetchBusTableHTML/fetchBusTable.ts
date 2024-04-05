import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get(__HTML_PARSER_API__);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw error;
  }
};