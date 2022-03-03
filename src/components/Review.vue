<template>
  <v-container>
    <v-card outlined elevation="0" class="pa-4 mb-4">
      <v-card-title>Personal Information</v-card-title>
      <v-text-field
        v-for="(k, i) in $store.state.personal_information"
        readonly
        :label="i.charAt(0).toUpperCase() + i.slice(1).replaceAll('_', ' ')"
        :key="i"
        :value="k"
      ></v-text-field>
    </v-card>
    <v-card outlined elevation="0" class="pa-4 mb-4">
      <v-card-title>Guardian's Information</v-card-title>
      <v-card class="pa-4 mb-3" outlined elevation="0">
        <v-card-subtitle>Father</v-card-subtitle>
        <v-text-field
          v-for="(k, i) in $store.state.guardians_information.father"
          readonly
          :label="i.charAt(0).toUpperCase() + i.slice(1).replaceAll('_', ' ')"
          :key="i"
          :value="k"
        ></v-text-field>
      </v-card>

      <v-card class="pa-4 mb-2" outlined elevation="0"
        ><v-card-subtitle>Mother</v-card-subtitle>
        <v-text-field
          v-for="(k, i) in $store.state.guardians_information.mother"
          readonly
          :label="i.charAt(0).toUpperCase() + i.slice(1).replaceAll('_', ' ')"
          :key="i"
          :value="k"
        ></v-text-field>
      </v-card>

      <v-card class="pa-4 mb-2" outlined elevation="0"
        ><v-card-subtitle>Local Guardian</v-card-subtitle>
        <v-text-field
          v-for="(k, i) in $store.state.guardians_information.local_guardian"
          readonly
          :label="i.charAt(0).toUpperCase() + i.slice(1).replaceAll('_', ' ')"
          :key="i"
          :value="k"
        ></v-text-field>
      </v-card>
    </v-card>

    <v-card outlined elevation="0" class="pa-4 mb-4">
      <v-card-title>Educational Information</v-card-title>
      <v-data-table
        :headers="educational_forms_headers"
        :items="$store.state.educational_information.educational_forms"
      >
      </v-data-table>
    </v-card>
    <v-row justify="end">
      <v-btn @click="completeReview" text outlined color="#1575aa"
        >Continue</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  emits: ["continue"],
  data() {
    return {
      educational_forms_headers: [
        { text: "Degree", value: "degree" },
        { text: "Passing Year", value: "passing_year" },
        { text: "Institute Name", value: "institute_name" },
        { text: "Board/University", value: "board_or_university" },
        { text: "Department/Group", value: "dept_or_group" },
        { text: "GPA", value: "gpa" },
      ],
    };
  },
  methods: {
    completeReview() {
      this.$router.push({
        name: "Complete",
        params: {
          application: this.application,
          personal_information: this.personal_information,
          guardians_information: this.guardians_information,
          educational_information: this.educational_information,
          additional_information: this.additional_information,
        },
      });
    },
  },
  computed: {
    ...mapGetters({
      application: "application_information_getter",
      personal_information: "personal_information_getter",
      guardians_information: "guardians_information_getter",
      educational_information: "educational_information_getter",
      additional_information: "additional_information_getter",
    }),
  },
};
</script>

<style>
</style>