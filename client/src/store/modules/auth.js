import types from "../types";
import Fetch from "../../api/index";

const fetch = new Fetch();

export default {
  namespaced: true,

  state: () => ({
    is_logged: false,
    first_name: "",
    last_name: "",
    avatar: "",
  }),

  mutations: {
    [types.login]: (state, payload) => {
      state.is_logged = true;
      state.first_name = payload.first_name;
      state.last_name = payload.last_name;
      state.avatar = payload.avatar;
    },
    [types.logout]: (state) => {
      state.is_logged = false;
    },
  },
  actions: {
    [types.login]: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        return fetch
          .Post(fetch.ENDPOINTS.AUTH.LOGIN, {
            username: payload.username,
            password: payload.password,
          })
          .then((resp) => {
            resolve(resp.data.data);
            commit(types.login, resp.data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    [types.logout]: ({ commit }) => {
      return new Promise((resolve, reject) => {
        return fetch
          .Post(fetch.ENDPOINTS.AUTH.LOGOUT)
          .then(() => {
            resolve(true);
            commit(types.logout);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },

  getters: {
    [types.isAuthenticated]: (state) => {
      return state.is_logged;
    },
    [types.userGet]: (state) => {
      return {
        first_name: state.first_name,
        last_name: state.last_name,
        avatar:
          state.avatar || "https://randomuser.me/api/portraits/men/81.jpg",
      };
    },
  },
};
