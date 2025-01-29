<template>
  <!--<nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/not_found">NotFound</router-link>
  </nav> -->
  <AppHeader />
  <router-view />
</template>

<script>
import { AppHeader } from "@/widgets/AppHeader";

export default {
  components: {
    AppHeader,
  },
};
</script>
