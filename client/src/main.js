import Vue from "vue";
import VueMoment from "vue-moment";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import 'moment/locale/es'
import 'dayjs/locale/es'
import VueDummy from "vue-dummy"

Vue.config.productionTip = false;


// VueMoment.locale('es')
Vue.use(VueMoment);
Vue.use(VueDummy)

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
