<template>
    <v-app>

        <v-navigation-drawer app v-model="navDrawer" temporary bottom>

            <v-list>
                <router-link :key="item.text" v-for="item in navItems" :to="item.path">
                    <v-list-item >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.text }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>

            </v-list>



        </v-navigation-drawer>

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

            <router-link to="/settings" v-show="!isSettings">
                <v-btn icon>
                    <v-icon>mdi-cog-outline</v-icon>
                </v-btn>
            </router-link>

            <v-app-bar-nav-icon v-show="isSettings" class="mr-1" @click="navDrawer = !navDrawer"></v-app-bar-nav-icon>

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
        navDrawer: false,
        navItems: [
            {
                text: "My Details",
                icon: "mdi-account",
                path: "/"
            },
            {
                text: "Organisations",
                icon: "mdi-domain",
                path: "/settings/organisations"
            }
        ]
    }),

    beforeMount() {

        sessionStorage.setItem("user", {
            name: "dylan"
        });

    },

    computed:{

        isSettings(){
            return this.$route.path.startsWith("/settings");
        },

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

a {
    text-decoration: none;
}

</style>
