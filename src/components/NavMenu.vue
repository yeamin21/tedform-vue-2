<template>
  <v-app-bar
    app
    color="#1575aa"
    dark
    outlined
    rounded
    class="ma-2"
    elevation="3"
  >
    <div class="d-flex align-center">
      <v-btn text to="/">
        <v-img
          max-width="64"
          max-height="64"
          src="@/assets/logo.png"
          class="ma-2"
        ></v-img>
        <span class="hidden-sm-and-down">Army IBA Sylhet Admission</span>
      </v-btn>
    </div>

    <v-spacer></v-spacer>

    <v-btn
      v-if="$store.state.userStore.is_loggedIn === false"
      :to="{ name: 'Login' }"
      text
    >
      <span class="mr-2">Login</span>
    </v-btn>
    <div v-else-if="$store.state.userStore.is_loggedIn">
      <v-btn text :to="{ name: 'Profile' }">
        <span class="mr-2"> {{ this.$store.state.userStore.email }}</span>
      </v-btn>
      <v-btn text :to="{ name: 'Logout' }">
        <span class="mr-2">Logout</span>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavMenu",
};
</script>

<style>
</style>