<template>
    <div>

        <v-container class="max-width">

            <v-card :key="i" v-for="(loc, i) in locations" class="mt-8">
                <v-card-title>{{loc.name}}</v-card-title>
                <v-card-subtitle>{{loc.organisation}}</v-card-subtitle>
                <v-card-text v-show="loc.startTime">Started at {{new Date(loc.startTime).toLocaleString()}}</v-card-text>
                <v-card-actions>
                    <v-btn @click="clockIn(loc.id)" v-if="!loc.startTime" color="primary">Clock in</v-btn>
                    <v-btn @click="clockOut(loc.entryId)" v-if="loc.startTime" color="secondary">Clock out</v-btn>
                </v-card-actions>
            </v-card>

        </v-container>

    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {post, put} from "@/utilities/request";

export default {

    mounted() {

        if(!this.getLocationsUserIsIn.length){
            this.$router.push("/");
        }

        this.fetchClockedIn();

    },

    computed: {

        locations() {

            const _locations = [];

            for(let l of this.getLocationsUserIsIn){
                _locations.push(l);
            }

            // Locations with a clocked in entry
            const clockedInWithinBounds = this.getClockedInWithLocations(this.getLocationsUserIsIn);

            // Add more locations when there is a clocked in entry
            for(let c of clockedInWithinBounds){
                _locations.push({
                    id: c.location.id,
                    name: c.location.name,
                    organisation: c.location.organisation.name,
                    startTime: c.start,
                    entryId: c.id
                })
            }

            return _locations;

        },

        ...mapGetters("organisations", ["getLocationsUserIsIn", "getClockedInWithLocations"]),

    },

    methods: {

        async clockIn(locationId){

            await post("/api/organisations/timesheets/start", {
                locationId
            });
            await this.$router.push("/")

        },

        async clockOut(timesheetEntryId){

            await put("/api/organisations/timesheets/end", {
                timesheetEntryId
            });
            await this.$router.push("/")

        },

        ...mapActions("organisations", ["fetchClockedIn"])
    }

}
</script>

<style scoped>

</style>