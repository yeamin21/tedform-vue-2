import Vue from "vue";
import VueRouter from "vue-router";

const Application = () => import("../pages/Application.vue");
const Complete = () => import("../pages/Complete.vue");
const Login = () => import("../pages/Login.vue");
const Logout = () => import("../pages/Logout.vue");
const Profile = () => import("../pages/Profile.vue");
const Completed = () => import("../pages/Completed.vue");
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Apply",
    component: Application,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/completed",
    name: "Completed",
    component: Completed,
  },
  {
    path: "/complete",
    name: "Complete",
    component: Complete,
    props: true,
    beforeEnter: (to, from, next) => {
      if (to.params.application) {
        next(); //proceed
      } else {
        next({ name: "Apply" }); //redirect to home
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
