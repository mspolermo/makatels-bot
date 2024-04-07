import { busRouteToEkbType } from '../../model/types/types';
import cls from '../styles/busRoute.module.css';

interface busRouteToEkbProps {
    route: busRouteToEkbType
}

export const BusRouteToEkb = ({route}: busRouteToEkbProps) => {

    return (
        <div className={cls.busRoute}>
            <div className={cls.routeBlock}>
                <p className={cls.busNumber}>{route.busNumber}</p>
                <p className={cls.routeName}> {route.startCity} - Екб</p>
                <p className={cls.routeDays}>{route.days}</p>
            </div>
            <div className={cls.textBlock}>
                <div className={cls.startTime}>
                    {route.startTimeSouth && <p>
                        <span>Выезд (Полевской): </span>
                        <span className={cls.time}>{route.startTimeSouth}</span>
                    </p>}
                    <p>
                        <span>Выезд (Северский): </span>
                        <span className={cls.time}>{route.startTimeNorth}</span>
                    </p>
                </div>
                <p className={cls.finishTme}>Прибытие в Екб: {route.finishTme}</p>
            </div>

        </div>
    );
};
