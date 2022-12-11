import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

function isLoggedIn(to, from, next){

    const user = localStorage.getItem("user");

    if(!user) {
        sessionStorage.setItem("redirect", JSON.stringify(to));
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
        path: '/organisations',
        component: () => import(/* webpackChunkName: "organisations" */ '../views/organisations/Organisations.vue'),

        beforeEnter: isLoggedIn,
    },
    {
        path: '/organisations/join',
        component: () => import(/* webpackChunkName: "organisation" */ '../views/organisations/OrganisationJoin.vue'),

        beforeEnter: isLoggedIn,
    },
    {
        path: '/organisations/:code',
        component: () => import(/* webpackChunkName: "organisation" */ '../views/organisations/Organisation.vue'),

        beforeEnter: isLoggedIn,
    },
    {
        path: '/timesheet',
        component: () => import(/* webpackChunkName: "organisationLocations" */ '../views/organisations/TimesheetEntry.vue'),

        beforeEnter: isLoggedIn,
    },

]

const router = new VueRouter({
    routes,
    mode: "hash"
});

export default router
