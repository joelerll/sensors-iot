import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import inamhi from "./modules/inamhi";
import agencia from "./modules/agencia";
import VuexPersistence from "vuex-persist";
import types from "./types";
import Fetch from "../api/index";

const fetch = new Fetch();

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    inamhi,
    agencia,
  },
  state: {
    [types.current_path]: "/",
    drawer: true,
    titulo: "Iniciativa de datos abiertos de Guayaquil",
    titulo_tab: "Destacados",
    titulo_tab_1: "Medicion",
    titulo_tab_2: "Impacto",
    texto_tab_1: "Nunc euismod vel nunc dolor curabitur enim libero laoreet adipiscing id condimentum sit dolor a odio viverra libero a auctor nec vitae condimentum libero libero auctor vitae laoreet curabitur viverra enim consectetur dolor amet elit vel curabitur tincidunt atlorem in elit libero dolor ipsum id laoreet libero condimentum est euismod condimentum dolor atlorem nullam condimentum libero nullam odio id id sit elit odio libero a auctor est consectetur at ipsum consectetur vel nec sit sagittis id tincidunt amet amet amet in id vel amet adipiscing sagittis odio dolor auctor consectetur est enim viverra tincidunt nec ipsum euismod vel curabitur adipiscing curabitur sagittis libero sit tincidunt enim nec viverra id atlorem dolor est lorem elit sagittis nullam sit nunc id in adipiscing nullam auctor consectetur vitae est euismod enim elit euismod laoreet id odio vitae nunc atlorem nunc tincidunt laoreet nullam viverra ipsum nec id ipsum in dolor libero a vitae",
    texto_tab_2: "Nunc euismod vel nunc dolor curabitur enim libero laoreet adipiscing id condimentum sit dolor a odio viverra libero a auctor nec vitae condimentum libero libero auctor vitae laoreet curabitur viverra enim consectetur dolor amet elit vel curabitur tincidunt atlorem in elit libero dolor ipsum id laoreet libero condimentum est euismod condimentum dolor atlorem nullam condimentum libero nullam odio id id sit elit odio libero a auctor est consectetur at ipsum consectetur vel nec sit sagittis id tincidunt amet amet amet in id vel amet adipiscing sagittis odio dolor auctor consectetur est enim viverra tincidunt nec ipsum euismod vel curabitur adipiscing curabitur sagittis libero sit tincidunt enim nec viverra id atlorem dolor est lorem elit sagittis nullam sit nunc id in adipiscing nullam auctor consectetur vitae est euismod enim elit euismod laoreet id odio vitae nunc atlorem nunc tincidunt laoreet nullam viverra ipsum nec id ipsum in dolor libero a vitae",
    image_1: "https://miro.medium.com/max/1024/1*92OdlxNqI3iChI5kNl1MFg.jpeg",
    image_2: "https://images.idgesg.net/images/article/2019/02/iot_internet_of_things_mobile_connections_by_avgust01_gettyimages-1055659210_2400x1600-100788447-large.jpg",
  },
  mutations: {
    [types.pathSet]: (state, payload) => {
      state[types.current_path] = payload;
    },
    drawer: (state) => {
      state.drawer = !state.drawer;
    },
    landing: (state, payload) => {
      state.titulo = payload.titulo || state.titulo;
      state.titulo_tab = payload.titulo_tab;
      state.titulo_tab_1 = payload.titulo_tab_1;
      state.titulo_tab_2 = payload.titulo_tab_2;
      state.texto_tab_1 = payload.texto_tab_1;
      state.texto_tab_2 = payload.texto_tab_2;
      state.image_1 = payload.image_1;
      state.image_2 = payload.image_2;
    },
  },
  actions: {
    [types.pathSet]: ({ commit }, payload) => {
      commit(types.current_path, payload);
    },
    drawer: ({ commit }) => {
      commit("drawer");
    },
    landing: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        return fetch
          .Post(fetch.ENDPOINTS.LANDING.POST, payload)
          .then((resp) => {
            resolve(resp.data);
            commit("landing", payload);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    landing_get:  ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        return fetch
          .Get(fetch.ENDPOINTS.LANDING.GET, payload)
          .then((resp) => {
            resolve(resp.data.data);
            commit("landing", resp.data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  getters: {
    [types.pathGet]: (state) => {
      return state[types.current_path];
    },
    drawer: (state) => {
      console.log(state.drawer)
      return !state.drawer;
    },
    landing: (state) => {
      return {
        titulo: state.titulo,
        titulo_tab: state.titulo_tab,
        titulo_tab_1: state.titulo_tab_1,
        titulo_tab_2: state.titulo_tab_2,
        texto_tab_1: state.texto_tab_1,
        texto_tab_2: state.texto_tab_2,
        image_1: state.image_1,
        image_2: state.image_2,
      };
    },
  },
  plugins: [new VuexPersistence().plugin],
});
