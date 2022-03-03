import api from "../services/api";
export default {
  namespaced: true,
  state: {
    is_loggedIn: false,
    email: "",
    token: "",
    otp: [],
  },

  mutations: {
    save_otp(state, payload) {
      this.state.otp = payload;
    },
    save_token(state, payload) {
      state.token = payload.token;
    },
    save_user(state, payload) {
      state.email = payload.email;
      localStorage.setItem("token", state.token);
      api.defaults.headers.common["Authorization"] = `Token ${state.token}`;
      state.is_loggedIn = true;
    },
    remove_user(state) {
      state.email = null;
      localStorage.removeItem("token");
      state.is_loggedIn = false;
    },
  },
  actions: {
    send_otp({ commit }, payload) {
      return api.post("auth/email/", payload).then((response) => {
        commit("save_otp", response.data);
        return response.data;
      });
    },
    verify_token({ commit, dispatch }, payload) {
      return api
        .post("auth/token/", payload)
        .then((response) => {
          commit("save_token", {
            token: response.data.token,
          });
        })
        .then(() => dispatch("authorize"));
    },
    authorize({ commit, state }) {
      return api
        .post("usr/", { token: state.token })
        .then((response) => commit("save_user", response.data));
    },
    logout({ commit }) {
      commit("remove_user");
    },
  },
};
