import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import api from "./services/api";
Vue.config.productionTip = false;
Vue.prototype.$http = api;
new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
  created() {
    if (localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));
      this.$store.commit("userStore/save_token", {
        token: localStorage.getItem("token"),
      });
      this.$store.dispatch("userStore/authorize");
    }
  },
}).$mount("#app");
