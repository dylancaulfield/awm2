<template>
    <div>
        <LMap ref="map" class="map" :zoom="zoom" :center="mapLocation" :options="options">
            <LTileLayer title="Title" :url="url" :attribution="attribution"></LTileLayer>

            <LMarker :lat-lng="mapLocation"></LMarker>

            <div :key="org.id" v-for="org in organisations">

                <LPolygon :key="loc.id" v-for="loc in org.locations" :lat-lngs="loc.bounds"></LPolygon>

            </div>

        </LMap>

        <v-dialog
            transition="dialog-bottom-transition"
            max-width="600"
            v-model="dialog"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                >From the bottom
                </v-btn>
            </template>
            <template v-slot:default="dialog">
                <v-card>
                    <v-card-title class="error--text">Location Error</v-card-title>
                    <v-card-text>
                        <p>Your location can't be retrieved so you won't be able to clock in. Ensure you have given this
                            site permission to access your device's location.</p>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn
                            text
                            @click="dialog.value = false"
                        >OK
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>

        <div class="overlay">

            <v-btn @click="getLocation" class="top-right" color="secondary" fab>
                <v-icon>mdi-crosshairs-gps</v-icon>
            </v-btn>

            <v-sheet class="bottom secondary">
                <h3 class="text-center white--text">
                    Clock In/Out: {{ "0" }} Location{{ 0 == 0 ? "s" : "s" }}
                    <v-icon class="white--text">mdi-arrow-right-thick</v-icon>
                </h3>
            </v-sheet>
        </div>
    </div>
</template>

<script>
import {latLng} from "leaflet";
import {mapActions, mapGetters, mapState} from "vuex";
import {LMap, LMarker, LPolygon, LTileLayer} from "vue2-leaflet";

export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPolygon,
    },
    data() {
        return {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution:
                '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            zoom: 10,
            location: null,
            options: {
                zoomControl: false
            },
            dialog: false
        }
    },

    mounted() {
        if (this.isAuthenticated) {
            this.getLocation();
            this.fetchOrganisations();
        }
    },

    methods: {

        getLocation() {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(p => {

                        this.location = new latLng(p.coords.latitude, p.coords.longitude)

                    },
                    this.showNoLocationDialog)
            } else {
                this.showNoLocationDialog();
            }

        },

        showNoLocationDialog() {
            this.dialog = true;
        },

        ...mapActions("organisations", ["fetchOrganisations"])

    },
    computed: {

        mapLocation() {

            if (this.location) {
                return this.location;
            }

            return new latLng(53.350140, -6.266155)
        },

        ...mapState("organisations", ["organisations"]),
        ...mapGetters("user", ["isAuthenticated"]),
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

.top-right {
    position: fixed;
    top: 80px;
    right: 20px;
}

.bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: orange;
    padding: 20px;
    cursor: pointer;
}
</style>