import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/Login.vue";
import Home from "../views/Home/Home.vue";
import AuthGuard from "./auth-guard";

// tables
import TableShow from "../views/Table/TableShow.vue";

// users
import UsersShow from "../views/User/UsersShow.vue";

// Inamhi
import Inamhi from "../views/Inamhi/Inamhi.vue";

// Agencia Espacial
import AgenciaEspacial from "../views/AgenciaEspacial/AgenciaEspacial.vue";

// Landing
import Landing from "../views/Landing/Landing.vue"

// Wifi
import Wifi from "../views/Wifi/Wifi.vue"


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/wifi",
    name: "Wifi",
    component: Wifi,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: AuthGuard,
  },
  {
    path: "/users",
    name: "Usuarios",
    component: UsersShow,
    beforeEnter: AuthGuard,
  },
  {
    path: "/table",
    name: "TableShow",
    component: TableShow,
    beforeEnter: AuthGuard,
  },
  {
    path: "/inamhi",
    name: "Inamhi",
    component: Inamhi
  },
  {
    path: "/agencia-espacial",
    name: "AgenciaEspacial",
    component: AgenciaEspacial
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
