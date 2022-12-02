<template>
    <div>


        <LMap @click="savePosition" ref="map" class="map" :zoom="zoom" :center="center" :options="options">
            <LTileLayer title="Title" :url="url" :attribution="attribution"></LTileLayer>

            <LMarker :lat-lng="center"></LMarker>

            <LPolygon :lat-lngs="coords"></LPolygon>

        </LMap>

        <div class="overlay">

            <v-container fluid>

                <v-card min-width="200" max-width="100%">
                    <v-card-title>Title</v-card-title>
                </v-card>

            </v-container>


        </div>

    </div>
</template>

<script>
//import L from "leaflet"
import {LMap, LTileLayer, LMarker, LPolygon} from "vue2-leaflet";
//import {latLng} from "leaflet";
import {mapState} from "vuex";


export default {
    name: 'Home',
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
        ...mapState("user", ["user"])
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
