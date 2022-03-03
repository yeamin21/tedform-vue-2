<template>
  <v-form ref="form" v-model="valid" lazy-validation class="pa-4">
    <v-row>
      <v-col
        ><v-select
          :items="programs"
          v-model="program"
          label="Select Program"
          required
          :rules="required_rule"
        ></v-select
        ><v-select
          :items="venues"
          v-model="venue"
          label="Select Venue"
          required
          :rules="required_rule"
        ></v-select
      ></v-col>
      <v-col cols="12" md="6">
        <v-row justify="center" align="center">
          <v-card outlined elevation="0" height="202" width="202">
            <v-img
              contain
              :src="profile_picture_url"
              max-width="200"
              max-height="200"
            ></v-img>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" order-md="1" order="12">
        <v-text-field
          v-model="name"
          label="Name"
          required
          :rules="required_rule"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" order-sm="1">
        <v-file-input
          accept="image/*"
          show-size
          truncate-length="30"
          label="Photo"
          @change="loadImage"
          :rules="required_rule"
        ></v-file-input>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="phone"
          label="Phone"
          type="tel"
          required
          :rules="required_rule"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date_of_birth"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date_of_birth"
              label="Date of Birth"
              readonly
              v-bind="attrs"
              v-on="on"
              required
              :rules="required_rule"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date_of_birth"
            no-title
            scrollable
            :max="
              new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10)
            "
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date_of_birth)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="place_of_birth"
          label="Place of Birth"
          required
          :rules="required_rule"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="nid"
          label="National ID"
          required
          :rules="required_rule"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="nationality"
          label="Nationality"
          required
          :rules="required_rule"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-select
          :items="gender_list"
          v-model="gender"
          item-text="label"
          item-value="value"
          label="Gender"
          required
          :rules="required_rule"
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="marital_status"
          label="Marital Status"
          :items="marital_status_list"
          item-text="label"
          item-value="value"
          required
          :rules="required_rule"
        ></v-select>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-btn
        @click="addPersonalInformation"
        outlined
        color="#1575aa"
        :disabled="!valid"
        >Continue</v-btn
      >
    </v-row>
  </v-form>
</template>

<script>
export default {
  emits: ["continue"],
  data: () => ({
    valid: false,
    program: null,
    venue: null,
    name: "",
    profile_pic: "",
    profile_picture_url: "",
    nid: "",
    date_of_birth: "",
    place_of_birth: "",
    nationality: "",
    gender: "",
    phone: "",
    marital_status: "",
    menu: "",
    menu2: "",
    programs: ["MBA", "BBA"],
    gender_list: [
      { label: "Male", value: "m" },
      { label: "Female", value: "f" },
    ],
    marital_status_list: [
      { label: "Single", value: "s" },
      { label: "Married", value: "m" },
    ],
    venues: ["Sylhet", "Dhaka"],
    required_rule: [
      (v) => !!v || "required",
      // (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],

    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),

  methods: {
    loadImage(e) {
      this.photo = e;
      try {
        this.profile_picture_url = URL.createObjectURL(this.photo);
      } catch {
        this.profile_picture_url = "";
      }
    },
    addPersonalInformation() {
      // if (this.$refs.form.validate())
      {
        const {
          program,
          venue,
          name,
          photo,
          nid,
          date_of_birth,
          place_of_birth,
          nationality,
          gender,
          phone,

          marital_status,
        } = this;
        this.$store
          .dispatch("addPersonalInformation", {
            program,
            venue,
            name,
            photo,
            nid,
            date_of_birth,
            place_of_birth,
            nationality,
            gender,
            phone,

            marital_status,
          })
          .then(() => this.$emit("continue"));
      }
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