<template>
  <div>Страница не найдена</div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "NotFoundPage",
  setup() {
    const router = useRouter();
    const redirectTimer = ref(null);

    onMounted(() => {
      redirectTimer.value = setTimeout(() => {
        router.push({ name: "MainPage" });
      }, 2000);
    });

    onBeforeUnmount(() => {
      clearTimeout(redirectTimer.value);
    });
  },
};
</script>
