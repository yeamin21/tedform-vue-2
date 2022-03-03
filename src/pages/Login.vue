<template>
  <v-container fill-height>
    <v-row class="d-flex" align="center" justify="center">
      <v-col cols="10" lg="4" md="4">
        <v-card class="pa-2">
          <login></login>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Login from "../components/Login.vue";
export default {
  components: { Login },
};
</script>

<style>
</style>