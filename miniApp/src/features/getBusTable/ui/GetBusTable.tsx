import { useEffect, useState } from "react";
import { fetchData } from "../model/services/fetchBusTableHTML/fetchBusTable";
import { parseBusSchedule } from "../lib/parseBusSchedule";

export const GetBusTable = () => {
    const [busTable, setBusTable] = useState('');

    useEffect(() => {
        fetchData().then(
            data => setBusTable(parseBusSchedule(data, 'directly')),
            error => {throw new Error(error)}
        )
    }, []);

    return (
        <div>
            <p>Таблица автобусов</p>
            <p>{busTable}</p>
        </div>
    );
};
