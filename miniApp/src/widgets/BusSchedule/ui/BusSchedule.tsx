import { busDirectionType } from "@/entities/busRoute";
import { GetBusSchedule } from "@/features/getBusSchedule";
import { Filter } from "@/shared/ui/Filter/Filter";
import cls from './BusSchedule.module.css';
import { useMemo, useState } from "react";

export const BusSchedule = () => {
    const [direction, setDirection] = useState<busDirectionType>('toEkb');
    
    console.log(direction)

    const tabsArray = useMemo(() => [
        {
            name: 'Полевской -> Екб',
            activeStatus: direction === 'toEkb',
            onClick: () => setDirection('toEkb')
        },
        {
            name: 'Екб -> Полевской',
            activeStatus: direction === 'toPolevskoy',
            onClick: () => setDirection('toPolevskoy')
        }
    ], [direction])

    return (
        <div className={cls.BusSchedule}>
            <h2 className={cls.heading}>Расписание автобусов</h2>
            <Filter title="" tabs={tabsArray} className={cls.filtres}/>
            <GetBusSchedule direction={direction}/>
        </div>
    );
};
