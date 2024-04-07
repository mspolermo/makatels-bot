import { useEffect, useState } from "react";
import { fetchHTML } from "../model/services/fetchHTML/fetchHTML";
import { parseBusSchedule } from "../lib/parseBusSchedule";
import { BusRoute, busDirectionType } from "@/entities/busRoute";
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

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
            {busTable?.map(el => <BusRoute route={el}/>)}
        </div>
    );
};
