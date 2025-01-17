<template>
  <div :class="cls.busRoute">
    <div :class="cls.routeBlock">
      <p :class="cls.busNumber">{{ route.busNumber }}</p>
      <p :class="cls.routeName">Екб - {{ route.finishCity }}</p>
      <p :class="cls.routeDays">{{ route.days }}</p>
    </div>
    <div :class="cls.textBlock">
      <div :class="cls.startTime">
        <p>
          <span>Выезд (Екб): </span>
          <span :class="cls.time">{{ route.startTime }}</span>
        </p>
      </div>
      <div :class="cls.finishTime">
        <p :class="cls.arrival">
          Прибытие в Северский: {{ route.finishTimeNorth }}
        </p>
        <p v-if="route.finishTimeSouth" :class="cls.arrival">
          Прибытие в Полевской: {{ route.finishTimeSouth }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import cls from "../styles/busRoute.module.css";
import { PropType } from "vue";
import { busRouteToPolevskoyType } from "../../model/types/types";

export default {
  name: "BusRouteToPolevskoy",
  props: {
    route: {
      type: Object as PropType<busRouteToPolevskoyType>,
      required: true,
    },
  },
  computed: {
    cls() {
      return cls;
    },
  },
};
</script>
