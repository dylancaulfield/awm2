<template>
    <div>

        <v-container>

            <p v-show="!user.email">
                <router-link to="/login">Login to save locations to your account</router-link>
            </p>

            <p>Click on the map to save a location</p>

            <LMap @click="savePosition" ref="map" style="width: 100%; height: 300px" :zoom="zoom" :center="center">
                <LTileLayer :url="url" :attribution="attribution"></LTileLayer>
                <LMarker :lat-lng="center"></LMarker>
            </LMap>

        </v-container>

    </div>
</template>

<script>
//import L from "leaflet"
import {LMap, LTileLayer, LMarker} from "vue2-leaflet";
import {latLng} from "leaflet";
import {mapState} from "vuex";


export default {
    name: 'Home',
    components: {
        LMap,
        LTileLayer,
        LMarker
    },
    data(){
        return {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution:
                '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            zoom: 10,
            center: [53.3498, 6.2603]
        }
    },
    methods: {

        savePosition(){

            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(p => {

                    this.center = new latLng(p.coords.latitude, p.coords.longitude)

                    this.$refs.map.setCenter(this.center)

                })
            }

        },

    },
    computed: {
        ...mapState("user", ["user"])
    }
}
</script>
