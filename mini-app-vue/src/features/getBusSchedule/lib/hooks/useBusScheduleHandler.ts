import { ref, onMounted, watch, Ref } from "vue";
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

export function useBusScheduleHandler(direction: Ref<busDirectionType>) {
  const { tg } = useTelegram();
  const busSchedule = ref<busScheduleType>([]);
  const filtredSchedule = ref<busScheduleType>([]);
  const activeStatus = ref<filtresType>("all");
  const mainBtn = ref<mainBtnType>("Показать ближайшие");
  const isLoading = ref(true);

  // Загрузка расписания и фильтрация
  const fetchAndParseSchedule = (newDirection: busDirectionType) => {
    isLoading.value = true;

    fetchHTML().then(
      (data) => {
        const parsedSchedule = parseBusSchedule(data, newDirection);
        busSchedule.value = parsedSchedule;
        filtredSchedule.value = parsedSchedule;
        mainBtn.value = "Показать ближайшие";
        isLoading.value = false;
      },
      (error) => {
        isLoading.value = false;
        throw new Error(error);
      }
    );
  };

  // Первоначальная загрузка
  onMounted(() => {
    tg.MainButton.setParams({ text: mainBtn.value });
    tg.MainButton.show();
    fetchAndParseSchedule(direction.value);
  });

  // Обработка изменений direction
  watch(
    direction,
    (newDirection) => {
      fetchAndParseSchedule(newDirection);
    },
    { immediate: true } // Выполняем сразу при монтировании
  );

  // Главная кнопка
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

  // Фильтрация
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
    isLoading,
  };
}
