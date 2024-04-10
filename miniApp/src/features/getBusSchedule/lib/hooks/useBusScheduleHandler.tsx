import { busDirectionType } from "@/entities/busRoute";
import { useTelegram } from "@/shared/lib/hooks/useTelegram";
import { busScheduleType, filtresType, mainBtnType } from "../../model/types/types";
import { useEffect, useState } from "react";
import { fetchHTML } from "../../model/services/fetchHTML/fetchHTML";
import { parseBusSchedule } from "../parseBusSchedule";
import { getNearestRoutes } from "../getNearestRoutes";

export const useBusScheduleHandler = (direction: busDirectionType) => {
    const { tg, onToggleButton } = useTelegram();
    const [busSchedule, setBusSchedule] = useState<busScheduleType>();
    const [filtredSchedule, setFiltredSchedule] = useState<busScheduleType>();
    const [activeStatus, setActiveStatus] = useState<filtresType>('all');
    const [mainBtn, setMainBtn] = useState<mainBtnType>('Показать ближайшие');

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

    // Главная кнопка (нижняя)
    tg.MainButton.setParams({
        text: mainBtn
    })

    tg.MainButton.onClick(
        () => {
            setActiveStatus('all');
            switch (mainBtn) {
                case 'Показать ближайшие':
                    if (busSchedule) setFiltredSchedule(getNearestRoutes(busSchedule));
                    setMainBtn('Показать все');
                    break;
                case 'Показать все':
                    setFiltredSchedule(busSchedule);
                    setMainBtn('Показать ближайшие');
            }
        }
    )
    //Функция для клика по кнопкам фильтра
    const filterHandler = (value: filtresType) => {
        setActiveStatus(value);
        setMainBtn('Показать ближайшие');
        switch (value) {
            case 'all':
                setFiltredSchedule(busSchedule);
                break;
            case 'south':
                setFiltredSchedule(busSchedule?.filter((el) => el.busNumber === '145'));
                break;
            case 'north':
                setFiltredSchedule(busSchedule?.filter((el) => el.busNumber !== '145'));
                break;
            default:
                break;
        }
    };

    return {
        filtredSchedule,
        activeStatus,
        filterHandler
    };
};