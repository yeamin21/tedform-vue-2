<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-card-title>Additional Information</v-card-title>
    </v-row>

    <v-row>
      <v-col cols="12" lg="6">
        <v-radio-group
          label="Do you have any physical handicap?"
          v-model="handicap.has_attribute"
          row
        >
          <v-radio label="Yes" :value="true"></v-radio>
          <v-radio label="No" :value="false"></v-radio> </v-radio-group
      ></v-col>
      <v-col cols="12" lg="6">
        <v-text-field
          v-if="handicap.has_attribute"
          v-model="handicap.details"
          label="Handicap Details"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <v-radio-group
          label="Have you been dismissed from any educational institution?"
          v-model="dismissal.has_attribute"
          row
        >
          <v-radio label="Yes" :value="true"></v-radio>
          <v-radio label="No" :value="false"></v-radio> </v-radio-group
      ></v-col>
      <v-col cols="12" lg="6">
        <v-text-field
          v-if="dismissal.has_attribute"
          v-model="dismissal.details"
          label="Dismissal Details"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <v-radio-group
          label="Did You Appear AIBA admission Test Before?"
          v-model="previous_test_appearance.has_attribute"
          row
        >
          <v-radio label="Yes" :value="true"></v-radio>
          <v-radio label="No" :value="false"></v-radio> </v-radio-group
      ></v-col>
      <v-col cols="12" lg="6" v-if="previous_test_appearance.has_attribute">
        <v-row>
          <v-col>
            <v-text-field
              v-model="previous_test_appearance.test_serial_no"
              label="Admission Test Serial No"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :return-value.sync="previous_test_appearance.test_date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="previous_test_appearance.test_date"
                  label="Admission Test Date"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="previous_test_appearance.test_date"
                :max="
                  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10)
                "
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu2 = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu2.save(previous_test_appearance.test_date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <v-radio-group
          label="Were You admitted at AIBA before?"
          v-model="previous_admission.has_attribute"
          row
        >
          <v-radio label="Yes" :value="true"></v-radio>
          <v-radio label="No" :value="false"></v-radio> </v-radio-group
      ></v-col>
      <v-col cols="12" lg="6">
        #TODO: Learn about this input
        <v-file-input
          v-if="previous_admission.has_attribute"
          v-model="previous_admission.file"
          label="??????"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <v-radio-group
          label="Did You Have any Working Experience?"
          v-model="experience.has_attribute"
          row
        >
          <v-radio label="Yes" :value="true"></v-radio>
          <v-radio label="No" :value="false"></v-radio> </v-radio-group
      ></v-col>
      <v-col cols="12" lg="6">
        <v-textarea
          v-if="experience.has_attribute"
          v-model="experience.details"
          label="Write something about your experience"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-btn
        @click="addAdditionalInformation"
        text
        outlined
        color="green lighten-2"
        >Continue</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  emits: ["continue"],
  data() {
    return {
      handicap: {
        has_attribute: false,
        details: "",
      },
      dismissal: {
        has_attribute: false,
        details: "",
      },
      experience: {
        has_attribute: false,
        details: "",
      },
      previous_test_appearance: {
        has_attribute: false,
        test_serial_no: "",
        test_date: "",
      },
      previous_admission: {
        has_attribute: false,
        file: null,
      },
    };
  },
  methods: {
    addAdditionalInformation() {
      const {
        handicap,
        dismissal,
        experience,
        previous_test_appearance,
        previous_admission,
      } = this;
      this.$store
        .dispatch("addAdditionalInformation", {
          handicap,
          dismissal,
          experience,
          previous_test_appearance,
          previous_admission,
        })
        .then(() => this.$emit("continue"));
    },
  },
};
</script>

<style>
</style>