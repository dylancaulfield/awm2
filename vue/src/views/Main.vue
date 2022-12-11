<template>
    <div>

        <div v-show="!isAuthenticated">

            <v-container class="max-width">

                <h1>Welcome to GeoTimesheet</h1>

                <p>GeoTimesheet allows you to create an organisation and track when members clock in or out of the location</p>

                <h2>How it works</h2>

                <p>
                    You create a
                    <v-tooltip top color="secondary">
                        <template v-slot:activator="{ on, attrs }">
                            <span class="blue--text"
                                  style="cursor: help"
                                  v-bind="attrs"
                                  v-on="on"
                            >
                                Geofence
                            </span>
                        </template>
                        <span>A virtual perimeter around an area on a map</span>
                    </v-tooltip>
                    associated with a location and when users are within the area of the location they will be able to clock in/out.
                </p>

                <router-link to="/register">
                    <v-btn color="primary">Register</v-btn>
                </router-link>

                <router-link to="/login" class="ml-4">
                    <v-btn color="secondary">Login</v-btn>
                </router-link>

            </v-container>


        </div>

        <div v-show="isAuthenticated">

            <TimesheetMap></TimesheetMap>

        </div>

    </div>
</template>

<script>
import {mapGetters} from "vuex";
import TimesheetMap from "@/components/TimesheetMap";


export default {
    components: {
        TimesheetMap
    },
    data() {
        return {}
    },

    methods: {},
    computed: {
        ...mapGetters("user", ["isAuthenticated"]),
    }
}
</script>

<style scoped>


</style>
