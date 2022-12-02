import {get, post} from "@/utilities/request";
import router from "@/router";

// Store for user and csrf tokens
export default {

    namespaced: true,

    state: {
        user: {name: "Yvonne"},
        authToken: null
    },

    mutations: {

        setUser(state, user){
            state.user = user
        },

        setAuthToken(state, token){
            state.authToken = token
        },

        clearUser(state){
            state.user = {};
            state.authToken = null;
            localStorage.setItem("user", null);
            localStorage.setItem("authToken", null);
        },

    },

    actions: {

        async fetchUser(context){

            const response = await get("/api/auth/user")
            context.commit("setUser", response);

        },

        async login(context, loginRequest){

            const data = await post("/api/auth/token", loginRequest);
            context.commit("setAuthToken", data.token);

            const response = await get("/api/auth/user")
            context.commit("setUser", response);

            await router.push("/");

        },

        logout(context){

            context.commit("clearUser");

        },

    }
};