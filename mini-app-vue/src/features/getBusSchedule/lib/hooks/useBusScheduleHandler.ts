import { ref, onMounted, watch } from "vue";
import { useTelegram } from "@/shared/lib/hooks/useTelegram";
import { fetchHTML } from "../../model/services/fetchHTML/fetchHTML";
import { parseBusSchedule } from "../helpers/parseBusSchedule";
import { getNearestRoutes } from "../helpers/getNearestRoutes";
import {
  busScheduleType,
  filtresType,
  mainBtnType,
} from "../../model/types/types";
import { busDirectionType } from "@/entities/busRoute";

export function useBusScheduleHandler(direction: busDirectionType) {
  const tg = useTelegram();
  const busSchedule = ref<busScheduleType>([]);
  const filtredSchedule = ref<busScheduleType>([]);
  const activeStatus = ref<filtresType>("all");
  const mainBtn = ref<mainBtnType>("Показать ближайшие");

  onMounted(() => {
    tg.MainButton.show();
    fetchHTML().then(
      (data) => {
        const parsedSchedule = parseBusSchedule(data, direction);
        busSchedule.value = parsedSchedule;
        filtredSchedule.value = parsedSchedule;
        mainBtn.value = "Показать ближайшие";
      },
      (error) => {
        throw new Error(error);
      }
    );
  });

  watch(mainBtn, (newVal) => {
    tg.MainButton.setParams({ text: newVal });
  });

  tg.MainButton.onClick(() => {
    activeStatus.value = "all";
    if (mainBtn.value === "Показать ближайшие") {
      filtredSchedule.value = getNearestRoutes(busSchedule.value);
      mainBtn.value = "Показать все";
    } else {
      filtredSchedule.value = busSchedule.value;
      mainBtn.value = "Показать ближайшие";
    }
  });

  const filterHandler = (value: filtresType) => {
    activeStatus.value = value;
    mainBtn.value = "Показать ближайшие";
    switch (value) {
      case "all":
        filtredSchedule.value = busSchedule.value;
        break;
      case "south":
        filtredSchedule.value = busSchedule.value.filter(
          (el) => el.busNumber === "145"
        );
        break;
      case "north":
        filtredSchedule.value = busSchedule.value.filter(
          (el) => el.busNumber !== "145"
        );
        break;
    }
  };

  return {
    filtredSchedule,
    activeStatus,
    filterHandler,
  };
}
