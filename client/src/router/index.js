import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/Login.vue";
import Home from "../views/Home/Home.vue";
import AuthGuard from "./auth-guard";

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
    path: "*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
