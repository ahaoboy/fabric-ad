import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Admin from "../components/Admin.vue";
import MainPage from "../components/MainPage.vue";
import Login from "../components/Login.vue";
import AddUser from "../components/AddUser.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "MainPage",
        component: MainPage
    },
    {
        path: "/*",
        redirect:"/"
    },
    // {
    //     path: "/MainPage",
    //     name: "MainPage",
    //     component: MainPage
    // },
    // {
    //     path: "/admin",
    //     name: "Admin",
    //     component: Admin
    // },
    // {
    //     path: "/login",
    //     name: "Login",
    //     component: Login
    // },
    // {
    //     path: "/addUser",
    //     name: "AddUser",
    //     component: AddUser
    // },
];

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes
});

export default router;
