import { GetBusSchedule } from "@/features/getBusSchedule";

const MainPage = () => {

    return (
        <div>
            <p>Главная страница</p>
            <GetBusSchedule direction="toPolevskoy" />
        </div>
    );
};

export default MainPage;