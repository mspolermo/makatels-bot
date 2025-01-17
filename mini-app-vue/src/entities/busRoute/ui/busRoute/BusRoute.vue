<template>
  <div>
    <!-- Условное отображение компонента в зависимости от маршрута -->
    <BusRouteToEkb v-if="route.busDirection === 'toEkb'" :route="route" />
    <BusRouteToPolevskoy v-else-if="route.busDirection === 'toPolevskoy'" :route="route" />
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { busRouteToEkbType, busRouteToPolevskoyType } from "../../model/types/types";
import { BusRouteToPolevskoy } from "../busRouteToPolevskoy/BusRouteToPolevskoy";
import { BusRouteToEkb } from "../busRouteToEkb/busRouteToEkb";

export default {
  name: "BusRoute",
  components: {
    BusRouteToPolevskoy,
    BusRouteToEkb,
  },
  props: {
    route: {
      type: Object as PropType<busRouteToEkbType | busRouteToPolevskoyType>,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Стили для компонента, если необходимо */
</style>
