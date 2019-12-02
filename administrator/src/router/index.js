import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue"
import store from "@/store/index.js"
import SusbcriberList from '@/components/SubscriberTable.vue'
// import Sidebar from "../components/Sidebar.vue";
import Dashboard from "../views/Dashboard.vue";
import AddEvent from "../components/AddEvent.vue";
Vue.use(VueRouter);

const routes = [{
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == true) {
        next("/a");
      } else {
        next();
      }

    },
  },
  {
    path: "/",
    redirect: {
      path: "/login"
    }
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      tokenRequired: false
    },
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == false) {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: "/addevent",
    name: "addevent",
    component: AddEvent,
    meta: {
      tokenRequired: false
    },
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == false) {
        next("/login");
      } else {
        next();
      }
    }
  },
   {
    path: "/subscribers",
    name: "subscribers",
    component: SusbcriberList,
    meta: {
      tokenRequired: false
    },
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == false) {
        next("/login");
      } else {
        next();
      }
    }
  },
  // {
  //   path:"/imageupload",
  //   name:"imageupload",
  //   component:imageupload,
  //   meta: {
  //       tokenRequired: false
  //   }
  // },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/About.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == false) {
        next("/login");
      } else {
        next();
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;