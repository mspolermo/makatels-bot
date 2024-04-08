import { GetBusSchedule } from "@/features/getBusSchedule";

const MainPage = () => {

    return (
        <div>
            <GetBusSchedule direction="toPolevskoy" />
        </div>
    );
};

export default MainPage;