import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import inamhi from "./modules/inamhi";
import VuexPersistence from "vuex-persist";
import types from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    inamhi
  },
  state: {
    [types.current_path]: "/",
  },
  mutations: {
    [types.pathSet]: (state, payload) => {
      state[types.current_path] = payload;
    },
  },
  actions: {
    [types.pathSet]: ({ commit }, payload) => {
      commit(types.current_path, payload);
    },
  },
  getters: {
    [types.pathGet]: (state) => {
      return state[types.current_path];
    },
  },
  plugins: [new VuexPersistence().plugin],
});
