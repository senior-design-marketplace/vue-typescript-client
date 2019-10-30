import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/my-projects",
      name: "my-projects",
      component: () => import("./views/My Projects.vue")
    },
    {
      path: "/create",
      name: "create",
      component: () => import("./views/Create.vue")
    },
    {
      path: "/applications",
      name: "applications",
      component: () => import("./views/Applications.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/account",
      name: "account",
      component: () => import("./views/Account.vue")
    },
    {
      path: "/project/:id",
      name: "project",
      component: () => import("./views/Project.vue")
    }
  ]
});
