<template>
    <div>

        <div v-show="!isAuthenticated">

            <v-container class="max-width">

                <h1>Welcome to GeoTimesheet</h1>

                <p>GeoTimesheet allows you to track your employees time and only allows them to clock in when they are
                    in a location set by you</p>

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
            <LMap @click="savePosition" ref="map" class="map" :zoom="zoom" :center="center" :options="options">
                <LTileLayer title="Title" :url="url" :attribution="attribution"></LTileLayer>

                <LMarker :lat-lng="center"></LMarker>

                <div :key="org.id" v-for="org in organisations">

                    <LPolygon :key="loc.id" v-for="loc in org.locations" :lat-lngs="loc.polygon"></LPolygon>

                </div>



            </LMap>

            <div class="overlay">

                <v-container fluid>

                    <v-card min-width="200" max-width="100%">
                        <v-card-title>Title</v-card-title>
                    </v-card>

                </v-container>

            </div>


        </div>


    </div>
</template>

<script>
//import L from "leaflet"
import {LMap, LTileLayer, LMarker, LPolygon} from "vue2-leaflet";
//import {latLng} from "leaflet";
import {mapGetters, mapState} from "vuex";


export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPolygon
    },
    data() {
        return {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution:
                '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            zoom: 10,
            center: [53.3498, 6.2603],
            options: {
                zoomControl: false
            },
            coords: []
        }
    },
    methods: {

        savePosition(e) {

            console.log(e);

            this.coords.push(e.latlng);
            this.center = e.latlng;

            // if (navigator.geolocation) {
            //     navigator.geolocation.getCurrentPosition(p => {
            //
            //         this.center = new latLng(p.coords.latitude, p.coords.longitude)
            //
            //         this.$refs.map.setCenter(this.center)
            //
            //     })
            // }

        },

    },
    computed: {
        ...mapGetters("user", ["isAuthenticated"]),
        ...mapState("organisations", ["organisations"])
    }
}
</script>

<style scoped>

.map {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.overlay {
    position: absolute;
    z-index: 2;
}

</style>
