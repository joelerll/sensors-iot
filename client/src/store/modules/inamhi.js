import types from "../types";
import Fetch from "../../api/index";

const fetch = new Fetch();

export default {
  namespaced: true,

  state: () => ({
    is_logged: false,
    inamhi_data: {}
  }),

  mutations: {
    [types.inamhi_page]: (state, payload) => {
      state.inamhi_page = payload;
    },
  },
  actions: {
    [types.inamhi_page]: ({ commit }, payload) => {
      console.log(payload)
      return new Promise((resolve, reject) => {
        return fetch
          .Post(fetch.ENDPOINTS.INNAHI.PAGE, payload)
          .then((resp) => {
            resolve(resp.data.data);
            commit(types.inamhi_page, resp.data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },

  getters: {
    [types.inamhi_page_get]: (state) => {
      return state.inamhi_page;
    },
  },
};
