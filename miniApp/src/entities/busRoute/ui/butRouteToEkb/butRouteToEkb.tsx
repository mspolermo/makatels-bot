import { busRouteToEkbType } from '../../model/types/types';
import cls from '../styles/busRoute.module.css';

interface busRouteToEkbProps {
    route: busRouteToEkbType
}

export const BusRouteToEkb = ({route}: busRouteToEkbProps) => {

    return (
        <div className={cls.busRoute}>
            <p>{route.busNumber}</p>
            <p>{route.startCity}</p>
            {route.startTimeSouth && <p>{route.startTimeSouth}</p>}
            <p>{route.startTimeNorth}</p>
            <p>{route.finishTme}</p>
        </div>
    );
};
