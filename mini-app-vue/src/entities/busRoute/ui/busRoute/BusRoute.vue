<template>
  <div>
    <BusRouteToEkb v-if="route.busDirection === 'toEkb'" :route="route" />
    <BusRouteToPolevskoy
      v-else-if="route.busDirection === 'toPolevskoy'"
      :route="route"
    />
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import {
  busRouteToEkbType,
  busRouteToPolevskoyType,
} from "../../model/types/types";
import BusRouteToPolevskoy from "../busRouteToPolevskoy/BusRouteToPolevskoy.vue";
import BusRouteToEkb from "../busRouteToEkb/BusRouteToEkb.vue";

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
