import { useEffect, useState } from "react";
import { fetchHTML } from "../model/services/fetchHTML/fetchHTML";
import { parseBusSchedule } from "../lib/parseBusSchedule";
import { BusRouteToEkb, BusRouteToPolevskoy, busDirectionType } from "@/entities/busRoute";
import { busScheduleType } from "../model/types/types";

interface GetBusScheduleProps {
    direction: busDirectionType
}

export const GetBusSchedule = (props: GetBusScheduleProps) => {
    const { direction } = props;
    const [busTable, setBusTable] = useState<busScheduleType>();

    useEffect(() => {
        fetchHTML().then(
            data => setBusTable(parseBusSchedule(data, direction)),
            error => {throw new Error(error)}
        )
    }, []);
console.log(busTable)
    return (
        <div>
            <p>Таблица автобусов</p>
            {busTable?.map(el => {
                if (el.busDirection == 'toEkb') {
                    return (
                        <BusRouteToEkb route={el} />
                )}
                if (el.busDirection == 'toPolevskoy') {
                    return (
                        <BusRouteToPolevskoy route={el} />
                    )
                }
            })}
        </div>
    );
};
