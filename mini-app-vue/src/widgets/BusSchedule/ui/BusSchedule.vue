<template>
  <div class="BusSchedule">
    <h2 class="heading">Расписание автобусов</h2>
    <Filter :title="''" :tabs="tabsArray" class="filtres" />
    <GetBusSchedule :direction="direction" />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import GetBusSchedule from "@/features/getBusSchedule";
import Filter from "@/shared/ui/Filter/Filter";

export default {
  name: "BusSchedule",
  components: {
    GetBusSchedule,
    Filter,
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

<style scoped>
.BusSchedule {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.heading {
  text-align: center;
  color: var(--tg-theme-text-color);
}

.filtres {
  padding: 20px 0;
  border: 1px solid var(--tg-theme-hint-color);
  justify-content: space-around;
}

.filtres h2 {
  display: none;
}
</style>
