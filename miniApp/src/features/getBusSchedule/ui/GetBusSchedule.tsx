import { BusRoute, busDirectionType } from "@/entities/busRoute";
import cls from './GetBusSchedule.module.css';
import { useBusScheduleHandler } from "../lib/hooks/useBusScheduleHandler";
import { Filter } from "@/shared/ui/Filter/Filter";
import { useMemo } from "react";

interface GetBusScheduleProps {
    direction: busDirectionType
}

export const GetBusSchedule = ({ direction } : GetBusScheduleProps) => {
    const { filtredSchedule, activeStatus, filterHandler} = useBusScheduleHandler(direction);

    const tabsArray = useMemo(() => [
        {
            name: 'Все маршруты',
            activeStatus: activeStatus === 'all',
            onClick: () => filterHandler('all')
        },
        {
            name: '145',
            activeStatus: activeStatus === 'south',
            onClick: () => filterHandler('south')
        },
        {
            name: '120/122',
            activeStatus: activeStatus === 'north',
            onClick: () => filterHandler('north')
        }
    ], [activeStatus, filterHandler])

    return (
        <div className={cls.GetBuSchedule}>
            <Filter
                title="Фильтр:"
                tabs={tabsArray}
            />
            {filtredSchedule?.map( (el, i) => <BusRoute key={el.busNumber + i} route={el}/>)}
        </div>
    );
};
