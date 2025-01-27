<template>
  <div :class="cls.header">
    <span :class="cls.username">{{ user?.username }}</span>
    <AppButton @click="onClose" :class="cls.btn">Закрыть</AppButton>
  </div>
</template>

<script>
import AppButton from "@/shared/ui/AppButton/AppButton.vue";
import { useTelegram } from "@/shared/lib/hooks/useTelegram";
import cls from "./AppHeader.module.css";

export default {
  name: "AppHeader",
  components: {
    AppButton,
  },
  computed: {
    cls() {
      return cls;
    },
  },
  setup() {
    const { user, onClose } = useTelegram();

    return {
      user,
      onClose,
    };
  },
};
</script>
