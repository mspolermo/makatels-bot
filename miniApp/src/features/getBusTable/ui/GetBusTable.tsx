import { useEffect, useState } from "react";
import { fetchData } from "../api/fetchBusTableHTML/fetchBusTable";

export const GetBusTable = () => {
    const [busTable, setBusTable] = useState('');

    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                const data = await fetchData();
                setBusTable(data);
            } catch (error) {
                console.error('Произошла ошибка при получении данных:', error);
            }
        };

        fetchDataAndSetState();
    }, []);

    return (
        <div>
            <p>Таблица автобусов</p>
            <p>{busTable}</p>
        </div>
    );
};
