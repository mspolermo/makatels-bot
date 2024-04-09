import { useEffect, useState } from "react";
import { fetchHTML } from "../model/services/fetchHTML/fetchHTML";
import { parseBusSchedule } from "../lib/parseBusSchedule";
import { BusRoute, busDirectionType } from "@/entities/busRoute";
import { busScheduleType, mainBtnType } from "../model/types/types";
import Button from "@/shared/ui/Button/Button";
import cls from './GetBusSchedule.module.css';
import { useTelegram } from "@/shared/lib/hooks/useTelegram";
import { getNearestRoutes } from "../lib/getNearestRoutes";

interface GetBusScheduleProps {
    direction: busDirectionType
}

export const GetBusSchedule = (props: GetBusScheduleProps) => {
    const { direction } = props;
    const { tg, onToggleButton } = useTelegram();

    const [busSchedule, setBusSchedule] = useState<busScheduleType>();
    const [filtredSchedule, setFiltredSchedule] = useState<busScheduleType>();

    const [mainBtn, setMainBtn] = useState<mainBtnType> ('Показать ближайшие')

    tg.MainButton.setParams({
        text: mainBtn
    })

    tg.MainButton.onClick(
        () => {
            switch (mainBtn) {
                case 'Показать ближайшие':
                    if (busSchedule) setFiltredSchedule(getNearestRoutes(busSchedule));
                    setMainBtn('Показать все');
                    break;
                case 'Показать все':
                    setFiltredSchedule(busSchedule);
                    setMainBtn('Показать ближайшие')
            }
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
