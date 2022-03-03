<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="8" md="8" class="my-4">
        <application-list></application-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApplicationList from "../components/ApplicationList.vue";
export default {
  components: { ApplicationList },
};
</script>

<style>
</style>