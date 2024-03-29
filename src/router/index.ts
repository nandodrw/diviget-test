import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import RedditOauth from "@views/RedditOauth.vue";
import Posts from "@views/Posts.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/reddit-auth-redirect",
    name: "reddit-auth-redirect",
    component: RedditOauth
  },
  {
    path: "/posts",
    name: "posts",
    component: Posts
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
