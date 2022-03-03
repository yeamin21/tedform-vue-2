<template>
  <v-form class="pa-4">
    <v-card elevation="0" outlined class="px-4 mb-4">
      <v-card-title> Father's Information</v-card-title>
      <v-text-field v-model="father.name" label="Name"> </v-text-field>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="father.nid" label="NID"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="father.phone" label="Phone No."></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="father.occupation"
            label="Occupation"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="father.designation"
            label="Designation"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
    <v-card elevation="0" outlined class="px-4 mb-4">
      <v-card-title> Mother's Information</v-card-title>
      <v-text-field v-model="mother.name" label="Name"> </v-text-field>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="mother.nid" label="NID"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="mother.phone" label="Phone No."></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="mother.occupation"
            label="Occupation"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="mother.designation"
            label="Designation"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
    <v-card elevation="0" outlined class="px-4 mb-4">
      <v-card-title> Local guardian's Information (if any)</v-card-title>
      <v-text-field v-model="local_guardian.name" label="Name"> </v-text-field>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="local_guardian.nid" label="NID"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="local_guardian.phone"
            label="Phone No."
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="local_guardian.occupation"
            label="Occupation"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="local_guardian.designation"
            label="Designation"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <v-radio-group
          row
          label="Who will bear your educational expenses?"
          v-model="cost_bearer"
        >
          <v-radio
            v-for="expense_bearer in expense_bearers"
            :key="expense_bearer.value"
            :label="expense_bearer.name"
            :value="expense_bearer.value"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-btn @click="addGuardiansInformation" text outlined color="#1575aa"
        >Continue</v-btn
      >
    </v-row>
  </v-form>
</template>

<script>
export default {
  emits: ["continue"],
  data: () => ({
    expense_bearers: [
      { name: "Self", value: "s" },
      { name: "Father", value: "f" },
      { name: "Mother", value: "m" },
      { name: "Local Guardian", value: "l" },
    ],
    father: {
      name: "",
      nid: "",
      occupation: "",
      designation: "",
      phone: "",
    },
    mother: {
      name: "",
      nid: "",
      occupation: "",
      designation: "",
      phone: "",
    },
    local_guardian: {},
    cost_bearer: "s",
    valid: true,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],

  
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),

  methods: {
    addGuardiansInformation() {
      const { father, mother, local_guardian, cost_bearer } = this;

      this.$store
        .dispatch("addGuardiansInformation", {
          father,
          mother,
          local_guardian,
          cost_bearer,
        })
        .then(() => this.$emit("continue"));
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style>
</style>