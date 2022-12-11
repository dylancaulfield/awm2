<template>

    <div>

        <v-btn color="secondary" class="ma-4">Back</v-btn>

        <LMap @click="addPoint" ref="map" class="map" :zoom="zoom" :center="center" :options="options">

            <LTileLayer title="Title" :url="url" :attribution="attribution"></LTileLayer>

            <LPolygon :lat-lngs="points"></LPolygon>

        </LMap>

        <div class="overlay">

            <v-btn @click="goBack" class="top-left" color="secondary" fab small>
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-btn @click="getLocation" class="top-right" color="secondary" fab small>
                <v-icon>mdi-crosshairs-gps</v-icon>
            </v-btn>

        </div>

        <v-container class="max-width under-map">

            <h3>Create a location</h3>

            <v-divider class="my-4"></v-divider>

            <h4>Step 1</h4>

            <p>Create a polygon by clicking multiple point on the map. </p>

            <v-btn color="secondary" @click="clearPoints">Reset</v-btn>

            <div v-if="points.length > 0">

                <v-divider class="my-4"></v-divider>

                <h4>Step 2</h4>

                <p>Give a name to the new location</p>

                <v-form ref="locationForm">
                    <v-text-field :rules="[v => !!v || 'Location name is required']" v-model="name" label="Location name" class="mb-4"></v-text-field>
                </v-form>

                <v-btn color="primary" @click="createLocation">Create</v-btn>

            </div>



        </v-container>

    </div>

</template>

<script>
import {LMap, LPolygon, LTileLayer} from "vue2-leaflet";
import {latLng} from "leaflet";
import {post} from "@/utilities/request";

export default {
    components: {
        LMap,
        LTileLayer,
        LPolygon,
    },

    data() {
        return {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution:
                '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            zoom: 10,
            points: [],
            options: {
                zoomControl: false
            },
            center: new latLng(53.350140, -6.266155),
            name: ""
        }
    },

    methods: {

        addPoint(e){

            this.points.push(e.latlng);

        },

        clearPoints(){

            this.points = [];

        },

        getLocation() {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(p => {

                        this.center = new latLng(p.coords.latitude, p.coords.longitude)

                    })
            }

        },

        goBack(){
            this.$router.go(-1);
        },

        async createLocation(){

            if(!this.$refs.locationForm.validate()){
                return;
            }

            this.points.push(this.points[0])

            const bounds = this.points.map(p => [p.lng, p.lat]);

            const request = {
                organisationCode: this.$route.params.code,
                name: this.name,
                bounds
            }

            await post("/api/organisations/locations/create", request);
            await this.$router.push(`/organisations/${this.$route.params.code}`);

        }

    }

}
</script>

<style scoped>

.overlay {
    position: absolute;
    z-index: 2;
}

.map {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 350px;
    z-index: 1;
    cursor: default;
}

.top-right {
    position: fixed;
    top: 80px;
    right: 20px;
}

.top-left {
    position: fixed;
    top: 80px;
    left: 20px;
}

.under-map {
    margin-top: 300px;
}

</style>