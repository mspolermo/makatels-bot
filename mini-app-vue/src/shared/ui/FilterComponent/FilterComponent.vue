<template>
  <div :class="filterClasses">
    <h2 class="heading">{{ title }}</h2>
    <AppButton
      v-for="(tab, index) in tabs"
      :key="index + tab.name"
      :class="[tabClass(tab.activeStatus)]"
      @click="tab.onClick"
    >
      {{ tab.name }}
    </AppButton>
  </div>
</template>

<script>
import AppButton from "@/shared/ui/AppButton/AppButton.vue";
import { computed } from "vue";

export default {
  name: "FilterComponent",
  components: { AppButton },
  props: {
    className: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
    },
    tabs: {
      type: Array,
      required: true,
      validator: (tabs) =>
        tabs.every(
          (tab) =>
            typeof tab.name === "string" &&
            typeof tab.activeStatus === "boolean" &&
            typeof tab.onClick === "function"
        ),
    },
  },
  setup(props) {
    const filterClasses = computed(() =>
      ["Filter", props.className].filter(Boolean).join(" ")
    );

    const tabClass = (isActive) => {
      return isActive ? "tab active" : "tab";
    };

    return {
      filterClasses,
      tabClass,
    };
  },
};
</script>

<style scoped>
.Filter {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;
}

.heading {
  color: var(--tg-theme-section-header-text-color);
  font-size: 18px;
  font-weight: 600;
}

.tab {
  border-radius: 16px;
  color: var(--tg-theme-subtitle-text-color);
}

.active {
  color: var(--tg-theme-button-text-color);
  text-decoration: underline;
}
</style>
