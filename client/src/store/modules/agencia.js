import types from "../types";
import Fetch from "../../api/index";

const fetch = new Fetch();

export default {
  namespaced: true,

  state: () => ({
    is_logged: false,
    agencia_data: {},
    same_data: false,
    datos_perdidos: 0,
  }),

  mutations: {
    [types.agencia_page]: (state, payload) => {
      state.agencia_page = payload;
    },
    "same_data": (state, payload) => {
      state.same_data = payload;
    },
    "datos_perdidos": (state, payload) => {
      state.datos_perdidos = payload
    }
  },
  actions: {
    [types.agencia_page]: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        return fetch
          .Post(fetch.ENDPOINTS.AGENCIA_ESPACIAL.PAGE, payload)
          .then((resp) => {
            resolve(resp.data.data);
            commit(types.agencia_page, resp.data.data);
            commit("same_data", resp.data.same_date);
            commit("datos_perdidos", resp.data.datos_perdidos);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },

  getters: {
    [types.agencia_page_get]: (state) => {
      return state.agencia_page;
    },
    "same_data": (state) => {
      return state.same_data;
    },
    "datos_perdidos": (state) => {
      return state.datos_perdidos;
    },
  },
};
