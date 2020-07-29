import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/Login.vue";
import Home from "../views/Home/Home.vue";
import AuthGuard from "./auth-guard";

// tables
import TableShow from "../views/Table/TableShow.vue"

// users
import UsersShow from "../views/User/UsersShow.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: AuthGuard,
  },
  {
    path: "/users",
    name: "Users",
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
    path: "*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
