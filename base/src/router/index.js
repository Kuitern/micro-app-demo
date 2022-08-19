import Vue from "vue";
import VueRouter from "vue-router";

import { CHILD_PREFIX } from "@/micro/config.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: `/${CHILD_PREFIX}/first-child`,
    name: "FirstChild",
    children: [
      {
        path: "home",
        name: "FirstHome",
      },
      {
        path: "about",
        name: "FirstAbout",
      },
    ],
  },
  {
    path: `/${CHILD_PREFIX}/second-child`,
    name: "SecondChild",
    children: [
      {
        path: "home",
        name: "SecondHome",
      },
      {
        path: "about",
        name: "SecondAbout",
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
