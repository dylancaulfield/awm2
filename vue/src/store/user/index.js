import {get, post} from "@/utilities/request";

// Store for user and csrf tokens
export default {

    namespaced: true,

    getters: {
        isAuthenticated(state){
            return !!state.user.name;
        }
    },

    state: {
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
        authToken: localStorage.getItem("token")
    },

    mutations: {

        setUser(state, user){
            localStorage.setItem("user", JSON.stringify(user));
            state.user = user;
        },

        setAuthToken(state, token){
            localStorage.setItem("token", token);
            state.authToken = token;
        },

        clearUser(state){
            state.user = {};
            state.authToken = null;
            localStorage.clear();
            sessionStorage.clear();
        },

    },

    actions: {

        async fetchUser(context){

            const user = await get("/api/auth/user")
            context.commit("setUser", {
                name: user.first_name,
                email: user.email
            });

        },

        async login(context, loginRequest){

            try {

                const data = await post("/api/auth/token", loginRequest, false);
                context.commit("setAuthToken", data.token);

                return true;

            } catch (e){
                return false;
            }

        },

        async register(context, registerRequest){

            try {

                const data = await post("/api/auth/register", registerRequest, false);
                context.commit("setAuthToken", data.token);

                return true;

            } catch (e){
                return false;
            }
        },

        logout(context){

            context.commit("clearUser");

        },

    }
};