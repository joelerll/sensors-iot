import Store from "../store";

export default (to, from, next) => {
  if (Store.getters["auth/isAuthenticated"]) {
    next();
  } else {
    next("/");
  }
};
