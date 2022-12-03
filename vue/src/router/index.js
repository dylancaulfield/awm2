import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

function isLoggedIn(to, from, next){

    const user = sessionStorage.getItem("user");

    if(!user) {
        sessionStorage.setItem("redirect", to);
        return next({
            path: "/login",
            query: {
                redirect: true
            }
        });
    }

    next();

}

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/register',
        component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
    },
    {
        path: '/settings',
        component: () => import(/* webpackChunkName: "settings" */ '../views/settings/Settings.vue'),

        beforeEnter: isLoggedIn,
    },
    {
        path: '/organisations',
        component: () => import(/* webpackChunkName: "organisations" */ '../views/organisations/Organisations.vue'),

        beforeEnter: isLoggedIn,
    },
    {
        path: '/organisations/:id',
        component: () => import(/* webpackChunkName: "organisation" */ '../views/organisations/Organisation.vue'),

        beforeEnter: isLoggedIn,
    },
    {
        path: '/organisations/:id/locations',
        component: () => import(/* webpackChunkName: "organisationLocations" */ '../views/organisations/OrganisationLocations.vue'),

        beforeEnter: isLoggedIn,
    },

]

const router = new VueRouter({
    routes,
    mode: "history"
});

export default router
