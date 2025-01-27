<template>
  <div :class="cls.BusSchedule">
    <h2 :class="cls.heading">Расписание автобусов</h2>
    <FilterComponent :title="''" :tabs="tabsArray" :class="cls.filtres" />
    <GetBusSchedule :direction="direction" />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { GetBusSchedule } from "@/features/getBusSchedule";
import FilterComponent from "@/shared/ui/FilterComponent/FilterComponent.vue";
import cls from "./BusSchedule.module.css";

export default {
  name: "BusSchedule",
  components: {
    GetBusSchedule,
    FilterComponent,
  },
  computed: {
    cls() {
      return cls;
    },
  },
  setup() {
    const direction = ref("toEkb");

    const tabsArray = computed(() => [
      {
        name: "Полевской -> Екб",
        activeStatus: direction.value === "toEkb",
        onClick: () => (direction.value = "toEkb"),
      },
      {
        name: "Екб -> Полевской",
        activeStatus: direction.value === "toPolevskoy",
        onClick: () => (direction.value = "toPolevskoy"),
      },
    ]);

    return {
      direction,
      tabsArray,
    };
  },
};
</script>
