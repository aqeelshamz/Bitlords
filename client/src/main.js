import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Dashboard from "./views/Dashboard.vue";
import Test from "./views/Test.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Form from "./views/Form.vue";
import DentistDemo from "./views/DentistDemo.vue";

import { clerkPlugin } from "vue-clerk/plugin";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/test",
    component: Test,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/form",
    component: Form,
  },
  {
    path: "/demo/dentist",
    component: DentistDemo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(clerkPlugin, {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
});

app.mount("#app");
