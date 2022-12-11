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
        component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
    },
    {
        path: '/register',
        component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
    },
    {
        path: '/organisations',
        component: () => import(/* webpackChunkName: "Organisations" */ '../views/organisations/Organisations.vue'),

        beforeEnter: isLoggedIn,
    },
    {
        path: '/organisations/join',
        component: () => import(/* webpackChunkName: "OrganisationJoin" */ '../views/organisations/OrganisationJoin.vue'),

        beforeEnter: isLoggedIn,
    },
    {
        path: '/organisations/:code',
        component: () => import(/* webpackChunkName: "Organisation" */ '../views/organisations/Organisation.vue'),

        beforeEnter: isLoggedIn,
    },
    {
        path: '/organisations/:code/create-location',
        component: () => import(/* webpackChunkName: "LocationCreate" */ '../views/organisations/LocationCreate.vue'),

        beforeEnter: isLoggedIn,
    },
    {
        path: '/organisations/:code/members/:memberId',
        component: () => import(/* webpackChunkName: "OrganisationMemberTimesheets" */ '../views/organisations/OrganisationMemberTimesheets.vue'),

        beforeEnter: isLoggedIn,
    },
    {
        path: '/timesheet',
        component: () => import(/* webpackChunkName: "TimesheetEntry" */ '../views/organisations/TimesheetEntry.vue'),

        beforeEnter: isLoggedIn,
    },

]

const router = new VueRouter({
    routes,
    mode: "hash"
});

export default router
