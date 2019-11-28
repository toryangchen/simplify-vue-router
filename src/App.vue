<template>
  <div id="app">
    <component v-bind:is="layout"></component>
  </div>
</template>

<script>
import blank from "@/layouts/blank";
import error from "@/layouts/error";
import login from "@/layouts/login";

export default {
  computed: {
    layout() {
      return this.$store.getters.layout;
    }
  },
  components: {
    blank,
    login,
    error,
    default: () => import("@/layouts/default")
  }
};
</script>
