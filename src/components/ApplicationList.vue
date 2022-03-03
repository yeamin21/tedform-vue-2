<template>
  <v-card
    ><v-card-title>Your Applications</v-card-title>
    <v-list subheader two-line>
      <v-list-item v-for="(application, index) in applications" :key="index">
        <v-list-item-avatar
          ><v-img :src="application.personal_information.photo"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            >{{ application.program
            }}<v-chip
              color="red lighten-2"
              class="ma-2"
              dark
              outlined
              v-if="!application.payment"
              >awaiting payment</v-chip
            ></v-list-item-title
          >

          <v-list-item-subtitle
            v-text="new Date(application.created_at).toLocaleString()"
          ></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn
            icon
            v-if="!application.payment"
            color="primary"
            :to="{
              name: 'Complete',
              params: {
                application: application,
                personal_information: application.personal_information,
                guardians_information: application.guardians_information,
                educational_information: application.educational_information,
                additional_information: application.additional_information,
              },
            }"
          >
            <v-icon>mdi-arrow-right-box </v-icon>
          </v-btn>
          <v-btn icon v-else>
            <v-icon color="green lighten-2"> mdi-download-box</v-icon>
          </v-btn>
        </v-list-item-action></v-list-item
      ></v-list
    ></v-card
  >
</template>

<script>
import api from "../services/api";
export default {
  name: "ApplicationList",
  data() {
    return {
      applications: [],
    };
  },
  mounted() {
    api.get("/application/").then((response) => {
      this.applications = response.data;
    });
  },
};
</script>

<style>
</style>