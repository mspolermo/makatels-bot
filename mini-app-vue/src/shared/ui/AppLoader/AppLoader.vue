<template>
  <div class="loader">
    <div class="spinner"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppLoader",
});
</script>

<style scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--tg-theme-button-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
