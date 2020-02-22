import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/index.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register.vue")
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/admin.vue")
  },
  {
    path: "/news",
    name: "news",
    component: () => import("../views/news.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
