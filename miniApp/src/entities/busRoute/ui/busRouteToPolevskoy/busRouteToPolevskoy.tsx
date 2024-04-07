import { busRouteToPolevskoyType } from '../../model/types/types';
import cls from '../styles/busRoute.module.css';

interface busRouteToPolevskoyProps {
    route: busRouteToPolevskoyType
}

export const BusRouteToPolevskoy = ({route}: busRouteToPolevskoyProps) => {

    return (
        <div className={cls.busRoute}>
            <div className={cls.routeBlock}>
                <p className={cls.busNumber}>{route.busNumber}</p>
                <p className={cls.routeName}> Екб - {route.finishCity}</p>
                <p className={cls.routeDays}>{route.days}</p>
            </div>
            <div className={cls.textBlock}>
                <div className={cls.startTime}>
                    <p>
                        <span>Выезд (Екб): </span>
                        <span className={cls.time}>{route.startTime}</span>
                    </p>
                </div>
                <div className={cls.finishTme}>
                    <p className={cls.arrival}>Прибытие в Северский: {route.finishTimeNorth}</p>
                    {route.finishTimeSouth && <p className={cls.arrival}>Прибытие в Полевской: {route.finishTimeSouth}</p>}
                </div>

            </div>
        </div>
    );
};
