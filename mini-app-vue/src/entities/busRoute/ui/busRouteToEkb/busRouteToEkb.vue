<template>
  <div :class="cls.busRoute">
    <div :class="cls.routeBlock">
      <p :class="cls.busNumber">{{ route.busNumber }}</p>
      <p :class="cls.routeName">{{ route.startCity }} - Екб</p>
      <p :class="cls.routeDays">{{ route.days }}</p>
    </div>
    <div :class="cls.textBlock">
      <div :class="cls.startTime">
        <p v-if="route.startTimeSouth">
          <span>Выезд (Полевской): </span>
          <span :class="cls.time">{{ route.startTimeSouth }}</span>
        </p>
        <p>
          <span>Выезд (Северский): </span>
          <span :class="cls.time">{{ route.startTimeNorth }}</span>
        </p>
      </div>
      <p :class="cls.finishTme">Прибытие в Екб: {{ route.finishTme }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import cls from "../styles/busRoute.module.css";
import { busRouteToEkbType } from "../../model/types/types";

export default {
  name: "BusRouteToEkb",
  props: {
    route: {
      type: Object as PropType<busRouteToEkbType>,
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
