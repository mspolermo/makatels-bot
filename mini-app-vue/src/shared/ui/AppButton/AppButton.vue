<template>
  <button :class="['button', className]" v-bind="attrs" @click="handleClick">
    <slot />
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    className: {
      type: String,
      default: "",
    },
  },
  inheritAttrs: false,
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    },
  },
};
</script>

<style scoped>
.button {
  padding: 10px 15px;
  background-color: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
