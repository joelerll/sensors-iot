import types from "../types";
import Fetch from "../../api/index";

const fetch = new Fetch();

export default {
  namespaced: true,

  state: () => ({
    is_logged: false,
    agencia_data: {}
  }),

  mutations: {
    [types.agencia_page]: (state, payload) => {
      state.agencia_page = payload;
    },
  },
  actions: {
    [types.agencia_page]: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        return fetch
          .Post(fetch.ENDPOINTS.AGENCIA_ESPACIAL.PAGE, payload)
          .then((resp) => {
            resolve(resp.data.data);
            commit(types.agencia_page, resp.data.data);
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
  },
};
