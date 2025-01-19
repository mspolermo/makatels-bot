import {
  busRouteToEkbType,
  busRouteToPolevskoyType,
} from "@/entities/busRoute/model/types/types";

export type busScheduleType = Array<
  busRouteToPolevskoyType | busRouteToEkbType
>;

export type mainBtnType = "Показать ближайшие" | "Показать все";
export type filtresType = "all" | "south" | "north";
