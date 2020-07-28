import types from "../types";

export default {
  namespaced: true,

  state: () => ({
    is_logged: false,
  }),

  mutations: {
    [types.login]: (state) => {
      state.is_logged = true;
    },
    [types.logout]: (state) => {
      state.is_logged = false;
    },
  },

  actions: {
    [types.login]: ({ commit }) => {
      commit(types.login);
    },
    [types.logout]: ({ commit }) => {
      commit(types.logout);
    },
  },

  getters: {
    [types.isAuthenticated]: (state) => {
      return state.is_logged;
    },
  },
};
