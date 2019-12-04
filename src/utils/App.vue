<template>
  <div id="app">
    <component v-bind:is="layout"></component>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    layout() {
      return this.$store.getters.layout;
    }
  }
};
</script>
