import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
  },
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    increment({ commit }, payload) {
      commit("increment", payload);
    },
  },
  getters: {},
  plugins: [new VuexPersistence().plugin],
});
