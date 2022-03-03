<template>
  <v-container>
    <v-card
      v-for="(educational_form, index) in educational_forms"
      :key="index"
      class="mb-4 p-4"
      outlined
    >
      <v-row class="pa-4">
        <v-card-title>Educational Information {{ index + 1 }}</v-card-title>
        <v-spacer> </v-spacer>
        <v-btn
          color="red lighten-2"
          icon
          @click="removeEducationalInformationForm(index)"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-row>

      <v-form lazy-validation class="px-4">
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              label="Degree"
              v-model="educational_form.degree"
            ></v-text-field
          ></v-col>
          <v-col cols="12" lg="6">
            <v-select
              label="Passing Year"
              v-model="educational_form.passing_year"
              :items="passing_year"
            ></v-select
          ></v-col>
        </v-row>

        <v-text-field
          label="Name of Institute"
          v-model="educational_form.institute"
        ></v-text-field>
        <v-text-field
          label="Board/University"
          v-model="educational_form.board_or_university"
        ></v-text-field>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              label="Department/Program"
              v-model="educational_form.department_or_program"
            ></v-text-field
          ></v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              label="GPA"
              v-model="educational_form.gpa"
            ></v-text-field
          ></v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-row class="justify-center ma-4">
      <v-btn text outlined @click="addNewEducationalForm"
        >Add New Educational Form<v-icon right>mdi-plus</v-icon></v-btn
      >
    </v-row>
    <v-row justify="end">
      <v-btn
        @click="addEducationalInformation"
        text
        outlined
      color="#1575aa"
        >Continue</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  emits: ["continue"],
  data: () => ({
    educational_forms: [{ degree: null, passing_year: null }],
    passing_year: Array.from(
      { length: 10 },
      (_, i) => new Date().getFullYear() - i
    ),
  }),
  methods: {
    addEducationalInformation() {
      const { educational_forms } = this;
      this.$store
        .dispatch("addEducationalInformation", { educational_forms })
        .then(() => this.$emit("continue"));
    },
    addNewEducationalForm() {
      return this.educational_forms.push({ degree: null, passing_year: null });
    },
    removeEducationalInformationForm(index) {
      this.educational_forms.splice(index, 1);
    },
  },
};
</script>

<style>
</style>