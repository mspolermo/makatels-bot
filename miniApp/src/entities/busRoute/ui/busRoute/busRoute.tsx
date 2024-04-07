import { busRouteToEkbType, busRouteToPolevskoyType } from '../../model/types/types';
import { BusRouteToPolevskoy } from '../busRouteToPolevskoy/busRouteToPolevskoy';
import { BusRouteToEkb } from '../butRouteToEkb/butRouteToEkb';

interface busRouteProps {
    route: busRouteToEkbType | busRouteToPolevskoyType
}

export const BusRoute = ({route}: busRouteProps) => {
    switch (route.busDirection) {
        case 'toEkb':
            return <BusRouteToEkb route={route}/>
        case 'toPolevskoy':
            return <BusRouteToPolevskoy route={route} />
    }
};
