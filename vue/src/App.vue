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
            height="60px"
        >

            <router-link class="white--text" style="text-decoration: none" to="/">
                <v-app-bar-title>
                    <span class="font-weight-bold">Geo</span>Timesheet
                </v-app-bar-title>
            </router-link>


            <v-spacer></v-spacer>

            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
                        icon
                        v-show="isAuthenticated"
                    >
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item @click="logout" style="cursor:pointer;">
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <router-link to="/organisations" v-show="!isSettings">
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
import {mapActions, mapGetters} from "vuex";
import router from "@/router";

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

    computed:{

        isSettings(){
            return this.$route.path.startsWith("/settings");
        },

        ...mapGetters("user", ["isAuthenticated"]),

    },

    methods: {

        logout(){

            this.user.logout();
            router.push("/");

        },

        ...mapActions("user", ["fetchUser", "logout"]),
        ...mapActions("organisations", ["fetchOrganisations"])

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
