<template>
  <div :class="cls.header">
    <span :class="cls.username">{{ user?.username }}</span>
    <Button @click="onClose" :class="cls.btn">Закрыть</Button>
  </div>
</template>

<script>
import Button from "@/shared/ui/Button/Button.vue";
import { useWebApp } from "@/shared/lib/hooks/useWebApp";
import cls from "./AppHeader.module.css";

export default {
  name: "AppHeader",
  components: {
    Button,
  },
  computed: {
    cls() {
      return cls;
    },
  },
  setup() {
    const { user, onClose } = useWebApp();

    return {
      user,
      onClose,
    };
  },
};
</script>
