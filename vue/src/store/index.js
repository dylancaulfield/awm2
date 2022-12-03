import Vue from 'vue'
import Vuex from 'vuex'

import user from "@/store/user";
import organisations from "@/store/organisations";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        organisations
    }
});
