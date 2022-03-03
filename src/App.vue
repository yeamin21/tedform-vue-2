<template>
  <div id="app">
    <v-app>
      <nav-menu></nav-menu>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>



<script>
import NavMenu from "./components/NavMenu.vue";
export default {
  components: { NavMenu },
};
</script>



<style lang="scss">
</style>
