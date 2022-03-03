<template>
  <v-container class="mt-4">
    <v-row justify="center">
      <v-col xl="8" cols="12">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">
              Personal Information
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2">
              Guardian Information
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3" :complete="e1 > 3"
              >Educational Information</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step step="4" :complete="e1 > 4"
              >Additional Information</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step step="5" :complete="e1 > 5">Review</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <personal-information
                @continue="incrementStep"
              ></personal-information>
            </v-stepper-content>

            <v-stepper-content step="2">
              <guardian-information
                @continue="incrementStep"
              ></guardian-information>
            </v-stepper-content>

            <v-stepper-content step="3">
              <educational-information
                @continue="incrementStep"
              ></educational-information>
            </v-stepper-content>
            <v-stepper-content step="4">
              <additional-information
                @continue="incrementStep"
              ></additional-information>
            </v-stepper-content>
            <v-stepper-content step="5">
              <review></review>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import AdditionalInformation from "../components/AdditionalInformation.vue";
//import Complete from "../components/Complete.vue";
import EducationalInformation from "../components/EducationalInformation.vue";
import GuardianInformation from "../components/GuardianInformation.vue";
import PersonalInformation from "../components/PersonalInformation.vue";
import Review from "../components/Review.vue";
export default {
  components: {
    PersonalInformation,
    GuardianInformation,
    EducationalInformation,
    Review,
    AdditionalInformation,
    // Complete,
  },

  data() {
    return {
      e1: 1,
    };
  },
  methods: {
    incrementStep() {
      return this.e1++;
    },
  },
};
</script>
