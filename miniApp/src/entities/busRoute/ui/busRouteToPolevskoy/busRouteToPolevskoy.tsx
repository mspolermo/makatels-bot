import { busRouteToPolevskoyType } from '../../model/types/types';
import cls from '../styles/busRoute.module.css';

interface busRouteToPolevskoyProps {
    route: busRouteToPolevskoyType
}

export const BusRouteToPolevskoy = ({route}: busRouteToPolevskoyProps) => {

    return (
        <div className={cls.busRoute}>
            <p>{route.busNumber}</p>
            <p>{route.startTime}</p>
            {route.finishTimeSouth && <p>{route.finishTimeSouth}</p>}
            <p>{route.finishTimeNorth}</p>
            <p>{route.finishCity}</p>
        </div>
    );
};
