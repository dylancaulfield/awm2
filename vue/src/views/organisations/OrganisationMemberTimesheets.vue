<template>

    <v-container class="max-width">

        <v-btn color="secondary" class="mb-4" @click="goBack">Back</v-btn>

        <v-card>

            <v-card-title>{{ thisMember.name }}</v-card-title>

            <v-card-subtitle>{{ thisOrganisation.name }}</v-card-subtitle>

            <v-card-text v-if="thisTimesheets.length === 0">No timesheets for this member</v-card-text>

            <v-card-text v-if="thisTimesheets.length !== 0">

                <v-list>

                    <v-list-item :key="i" v-for="(ts, i) in thisTimesheets">

                        <v-list-item-content>

                            <v-list-item-title>
                                {{ ts.location }}
                            </v-list-item-title>

                            <v-list-item-subtitle>
                                Started: {{ new Date(ts.start).toLocaleString() }}
                            </v-list-item-subtitle>

                            <v-list-item-subtitle v-if="ts.finish">
                                Ended: {{ new Date(ts.finish).toLocaleString() }}
                            </v-list-item-subtitle>

                        </v-list-item-content>

                    </v-list-item>

                </v-list>

            </v-card-text>

        </v-card>

    </v-container>

</template>

<script>
import {mapActions, mapState} from "vuex";

export default {

    data() {

        return {
            locationFilter: ""
        }

    },

    async mounted() {
        await this.fetchOrganisations();
        await this.fetchOrganisationMemberData(this.$route.params.code);
    },

    computed: {

        thisOrganisation() {

            if (!this.organisations) return {};

            const org = this.organisations.filter(o => o.code == this.$route.params.code)[0];
            return org ? org : {};

        },

        thisMember() {

            if (!this.organisationMembers) return {};

            const member = this.organisationMembers
                .filter(o => o.id == this.$route.params.memberId)[0];

            return member ? member : {};

        },

        thisTimesheets() {

            if (!this.thisMember || !this.thisMember.timesheets) return [];

            // Sort by the newest start time
            return this.thisMember.timesheets
                .filter(t => t.location.includes(this.locationFilter))
                .sort((a, b) => {

                    let {x, y} = {x: new Date(a.start), y: new Date(b.start)}

                    return y.getTime() - x.getTime();

                });

        },

        ...mapState("organisations", ["organisations", "organisationMembers"])

    },

    methods: {

        goBack(){
            this.$router.go(-1);
        },

        ...mapActions("organisations", ["fetchOrganisations", "fetchOrganisationMemberData"])

    }

}
</script>

<style scoped>

</style>