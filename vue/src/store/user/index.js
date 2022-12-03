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
        user: {
            name: "Dylan Caulfield",
            email: "dpcdylan@gmail.com"
        },

        authToken: null
    },

    mutations: {

        setUser(state, user){
            localStorage.setItem("user", user);
            state.user = user;
        },

        setAuthToken(state, token){
            state.authToken = token;
        },

        clearUser(state){
            state.user = {};
            state.authToken = null;
            localStorage.clear();
        },

    },

    actions: {

        async fetchUser(context){

            const response = await get("/api/auth/user")
            context.commit("setUser", response);

        },

        async login(context, loginRequest){

            try {

                const data = await post("/api/auth/token", loginRequest, false);
                context.commit("setAuthToken", data);

                return true;

            } catch (e){
                return false;
            }

        },

        async register(context, registerRequest){

            try {

                const data = await post("/api/auth/register", registerRequest, false);
                context.commit("setAuthToken", data);

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