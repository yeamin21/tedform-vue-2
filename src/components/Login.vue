<template>
  <v-container
    ><v-snackbar v-model="show_snackbar" top timeout="1000"
      >{{ this.otp_message }}
    </v-snackbar>
    <!-- <v-form ref="form" v-model="valid" lazy-validation> -->
    <v-row align="center" justify="center">
      <v-col class="pa-4">
        <v-text-field
          :readonly="otp_sent"
          v-model="email"
          label="Email"
          type="email"
          :append-icon="otp_sent ? 'mdi-refresh' : null"
          @click:append="
            otp_sent = false;
            user_otp = '';
          "
        >
        </v-text-field>
        <v-row>
          <v-spacer> </v-spacer>
          <v-btn
            type="submit"
            text
            v-if="otp_sent === false"
            color="primary"
            @click="sendOtp"
            >Send OTP</v-btn
          >
        </v-row>

        <v-text-field
          v-if="otp_sent"
          v-model="user_otp"
          label="Enter the OTP from your email"
        ></v-text-field>
        <v-row>
          <v-spacer> </v-spacer>
          <v-btn text v-if="otp_sent" color="primary" @click="verify"
            >Verify</v-btn
          >
        </v-row>
      </v-col>
    </v-row>
    <!-- </v-form> -->
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      otp_sent: false,
      user_otp: "",
      otp_message: "",
      show_snackbar: false,
      valid: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },

  methods: {
    sendOtp() {
      // if (this.$refs.form.validate()) {
      this.$store
        .dispatch("userStore/send_otp", { email: this.email })
        .then(() => {
          this.otp_message = "an OTP has been sent to your email";
          this.show_snackbar = true;
          this.otp_sent = true;
        })
        .catch(() => {
          this.otp_sent = false;
          this.show_snackbar = true;
          this.otp_message = "an error occurred while sending OTP";
        });
      // }
    },
    verify() {
      this.$store.dispatch("userStore/verify_token", {
        email: this.email,
        token: this.user_otp,
      });
      // .catch(() => {
      //   this.otp_sent = false;
      //   this.show_snackbar = true;
      //   this.otp_message = "your OTP is invalid";
      // });
    },
  },
};
</script>

<style>
</style>