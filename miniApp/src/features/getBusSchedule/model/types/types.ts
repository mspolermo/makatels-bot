import { busRouteToEkbType, busRouteToPolevskoyType } from "@/entities/busRoute/model/types/types";

export type busScheduleType = Array<busRouteToPolevskoyType | busRouteToEkbType>;
