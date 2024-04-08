import { useEffect, useState } from "react";
import { fetchHTML } from "../model/services/fetchHTML/fetchHTML";
import { parseBusSchedule } from "../lib/parseBusSchedule";
import { BusRoute, busDirectionType } from "@/entities/busRoute";
import { busScheduleType } from "../model/types/types";
import Button from "@/shared/ui/Button/Button";
import cls from './GetBusSchedule.module.css';
import { useTelegram } from "@/shared/lib/hooks/useTelegram";

interface GetBusScheduleProps {
    direction: busDirectionType
}

export const GetBusSchedule = (props: GetBusScheduleProps) => {
    const { direction } = props;
    const { tg, onToggleButton } = useTelegram();
    const [busSchedule, setBusSchedule] = useState<busScheduleType>();

    const [filtredSchedule, setFiltredSchedule] = useState<busScheduleType>();

    tg.MainButton.setParams({
        text: 'Показать ближайшие'
    })

    tg.MainButton.onClick(
        () => {
            let currentTime = new Date();
            setFiltredSchedule(busSchedule?.filter(el => {
                if (
                    el.busDirection === 'toPolevskoy' && 
                    ( Number(el.startTime.split(':')[0]) >= currentTime.getHours()) &&
                    ( Number(el.startTime.split(':')[0]) <= currentTime.getHours()+ 2)) 
                    {
                   return el
                }
            }))

            
        }
    )

    useEffect(() => {
        () => onToggleButton();

        fetchHTML().then(
            data => {
                const parsedSchedule = parseBusSchedule(data, direction);
                setBusSchedule(parsedSchedule);
                setFiltredSchedule(parsedSchedule);
            },
            error => {throw new Error(error)}
        )
        return (
            () => onToggleButton()
        )
    }, []);

    return (
        <div className={cls.GetBuSchedule}>
            <div className={cls.filtersPanel} >
            <p className={cls.filtersHeading}>Фильтр:</p>
                <Button
                    className={cls.Tab}
                    onClick={() => setFiltredSchedule(busSchedule)}
                >
                    Все маршруты
                </Button>
                <Button
                    className={cls.Tab}
                    onClick={() => setFiltredSchedule(busSchedule?.filter(el => el.busNumber === '145'))}
                    >
                        145
                    </Button>
                <Button
                    className={cls.Tab}
                    onClick={() => setFiltredSchedule(busSchedule?.filter(el => el.busNumber !== '145'))}
                    >
                        120/122
                </Button>
            </div>
            {filtredSchedule?.map(el => <BusRoute route={el}/>)}
        </div>
    );
};
