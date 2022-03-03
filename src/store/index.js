import Vue from "vue";
import Vuex from "vuex";
import UserStore from "./UserStore";
import api from "../services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    personal_information: {},
    guardians_information: {},
    educational_information: [],
    additional_information: {},
  },
  mutations: {
    savePersonalInformation(state, { program, venue, ...payload }) {
      state.program = program;
      state.venue = venue;
      state.personal_information = payload;
    },
    saveGuardiansInformation(state, { cost_bearer, ...payload }) {
      state.guardians_information = payload;
      state.cost_bearer = cost_bearer;
    },
    saveEducationalInformation(state, payload) {
      return (state.educational_information = payload.educational_forms);
    },
    saveAdditionalInformation(state, payload) {
      return (state.additional_information = payload);
    },
  },
  actions: {
    addPersonalInformation({ commit }, payload) {
      commit("savePersonalInformation", payload);
    },
    addGuardiansInformation({ commit }, payload) {
      commit("saveGuardiansInformation", payload);
    },
    addEducationalInformation({ commit }, payload) {
      commit("saveEducationalInformation", payload);
    },
    addAdditionalInformation({ commit }, payload) {
      commit("saveAdditionalInformation", payload);
    },

    saveApplication({ state }) {
      const formData = new FormData();
      formData.append(
        "personal_information",
        JSON.stringify(this.state.personal_information)
      );

      formData.append(
        "guardians_information",
        JSON.stringify(state.guardians_information)
      );

      formData.append(
        "educational_information",
        JSON.stringify(state.educational_information)
      );

      formData.append(
        "additional_information",
        JSON.stringify(state.additional_information)
      );
      formData.append("profile_photo", state.personal_information.photo);
      formData.append(
        "previous_admission_file",
        state.additional_information.previous_admission.file
      );
      formData.append("venue", state.venue);
      formData.append("program", state.program);
      formData.append("cost_bearer", state.cost_bearer);
      api
        .post("/application/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    application_information_getter: (state) => ({
      program: state.program,
      venue: state.venue,
    }),
    personal_information_getter: (state) => state.personal_information,
    guardians_information_getter: (state) => state.guardians_information,
    educational_information_getter: (state) => state.educational_information,
    additional_information_getter: (state) => state.additional_information,
  },
  modules: {
    userStore: UserStore,
  },
});
