<template>
  <v-container class="mt-4">
    <v-row justify="center">
      <v-col md="12" xl="8">
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="pa-4">
              <v-card-title>Selected Application</v-card-title>
              <v-card-text
                ><b>Program:</b> {{ this.application.program }}</v-card-text
              >
              <v-card-text
                ><b>Venue:</b> {{ this.application.venue }}</v-card-text
              >
              <v-card-text v-if="application.created_at"
                ><b>Created at:</b>
                {{
                  new Date(this.application.created_at).toLocaleString()
                }}</v-card-text
              >
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-row>
              <v-col cols="12">
                <v-card class="pa-4">
                  <v-row>
                    <v-col cols="12">
                      <v-card
                        v-if="!$store.state.userStore.is_loggedIn"
                        elevation="0"
                        ><v-card-subtitle>
                          Please Login to Continue
                        </v-card-subtitle>
                        <login></login>
                      </v-card>
                    </v-col>
                  </v-row>
                  <!-- <v-divider class="mx-4"></v-divider> -->
                  <v-row>
                    <v-col cols="12">
                      <v-card
                        elevation="0"
                        v-if="$store.state.userStore.is_loggedIn"
                      >
                        <v-row justify="center">
                          <v-radio-group v-model="pay_now" row>
                            <v-radio label="Pay Now" :value="true"></v-radio>
                            <v-radio
                              v-if="!application.created_at"
                              label="Save for Later"
                              :value="false"
                            ></v-radio
                          ></v-radio-group>
                        </v-row>

                        <v-radio-group v-if="pay_now">
                          <v-radio
                            v-for="(method, index) in payment_methods"
                            :label="method.name"
                            :value="method.value"
                            :key="index"
                          ></v-radio>
                        </v-radio-group>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            outlined
                            v-if="pay_now"
                            color="green lighten-2"
                            @click="pay"
                            >Pay</v-btn
                          >
                          <v-btn
                            v-else-if="!application.created_at && !pay_now"
                            outlined
                            color="primary"
                            @click="save"
                            text
                          >
                            Save for Later
                          </v-btn>
                        </v-card-actions></v-card
                      >
                    </v-col></v-row
                  >
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Login from "../components/Login.vue";
export default {
  components: { Login },
  name: "Complete",
  props: ["application"],
  data() {
    return {
      pay_now: true,
      payment_methods: [
        { name: "bKash", value: "cash" },
        { name: "Bank", value: "bank" },
      ],
    };
  },
  methods: {
    pay() {
      console.log("pay_clicked");
    },
    save() {
      this.$store.dispatch("saveApplication");
    },
  },
};
</script>

<style>
</style>