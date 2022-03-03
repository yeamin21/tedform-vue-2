<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <h3><strong>You have been logged out</strong></h3>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Logout",
  created() {
    this.$store.dispatch("userStore/logout");
  },
};
</script>

<style>
</style>