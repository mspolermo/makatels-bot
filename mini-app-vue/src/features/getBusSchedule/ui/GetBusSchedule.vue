<template>
  <div :class="cls.getBusSchedule">
    <FilterComponent title="Фильтр:" :tabs="tabsArray" />
    <div v-if="filtredSchedule.length">
      <BusRoute
        v-for="(route, index) in filtredSchedule"
        :key="route.busNumber + index"
        :route="route"
      />
    </div>
    <div v-else>Нет данных для отображения</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, PropType, ref } from "vue";
import { useBusScheduleHandler } from "../lib/hooks/useBusScheduleHandler";
import FilterComponent from "@/shared/ui/FilterComponent/FilterComponent.vue";
import { BusRoute } from "@/entities/busRoute";
import cls from "./GetBusSchedule.module.css";
import { busDirectionType } from "@/entities/busRoute/model/types/types";

export default defineComponent({
  name: "GetBusSchedule",
  components: { FilterComponent, BusRoute },
  props: {
    direction: {
      type: String as PropType<busDirectionType>,
      required: true,
    },
  },
  setup(props) {
    const directionRef = ref(props.direction);
    const { filtredSchedule, activeStatus, filterHandler } =
      useBusScheduleHandler(directionRef);

    // Watch for direction changes and reinitialize the handler
    watch(
      () => props.direction,
      (newDirection) => {
        console.log("Direction changed to:", newDirection);
        directionRef.value = newDirection;
      }
    );

    const tabsArray = computed(() => [
      {
        name: "Все маршруты",
        activeStatus: activeStatus.value === "all",
        onClick: () => filterHandler("all"),
      },
      {
        name: "145",
        activeStatus: activeStatus.value === "south",
        onClick: () => filterHandler("south"),
      },
      {
        name: "120/122",
        activeStatus: activeStatus.value === "north",
        onClick: () => filterHandler("north"),
      },
    ]);

    return {
      cls,
      filtredSchedule,
      tabsArray,
    };
  },
});
</script>
