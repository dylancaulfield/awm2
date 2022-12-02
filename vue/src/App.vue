<template>
    <v-app>
        <v-app-bar
            app
            color="primary"
            dark
            hide-on-scroll
        >

            <router-link class="white--text" style="text-decoration: none" to="/">
                <v-app-bar-title>
                    <span class="font-weight-bold">Geo</span>Timesheet
                </v-app-bar-title>
            </router-link>


            <v-spacer></v-spacer>

            <router-link to="/account">
                <v-btn icon>
                    <v-icon>mdi-account</v-icon>
                </v-btn>
            </router-link>


        </v-app-bar>

        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: 'App',

    data: () => ({
        //
    }),

    beforeMount() {

        if(localStorage.getItem("user")){
            this.fetchUser()
        }
    },

    methods: {
        ...mapActions("user", ["fetchUser"])
    }

};
</script>

<style>

.max-width {
    max-width: 800px;
}

</style>
