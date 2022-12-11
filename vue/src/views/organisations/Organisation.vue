<template>
    <div v-if="thisOrganisation">

        <v-container class="max-width">

            <v-btn color="secondary" class="mb-4" @click="goBack">Back</v-btn>

            <v-card>

                <v-card-title>
                    {{thisOrganisation.name}}
                </v-card-title>

                <v-card-subtitle>
                    Joining Code: {{thisOrganisation.code}}
                </v-card-subtitle>

                <v-card-text>

                    <QrcodeVue :value="qr" size="150" level="H" />

                    <v-divider class="my-4"></v-divider>

                    <router-link :to="`/organisations/${thisOrganisation.code}/create-location`">
                        <v-btn color="primary" class="mb-4">Create Location</v-btn>
                    </router-link>

                    <h3>Locations ({{thisOrganisation.locations.length}})</h3>

                    <v-list>

                        <v-list-item :key="loc.id" v-for="loc in thisOrganisation.locations">

                            <v-list-item-title>
                                {{ loc.name }}
                            </v-list-item-title>

                        </v-list-item>

                    </v-list>

                    <h3>Members ({{organisationMembers.length}})</h3>

                    <v-list>

                        <v-list-item :key="member.id" v-for="member in organisationMembers">

                            <router-link :to="`/organisations/${thisOrganisation.code}/members/${member.id}`" >
                                <v-list-item-title>
                                    {{ member.name }}
                                </v-list-item-title>
                            </router-link>

                        </v-list-item>

                    </v-list>


                </v-card-text>


            </v-card>

        </v-container>

    </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import {mapActions, mapState} from "vuex";

export default {

    components: {
        QrcodeVue
    },

    data(){
        return {

        }
    },

    async mounted() {
        await this.fetchOrganisations();
        await this.fetchOrganisationMemberData(this.$route.params.code);
    },

    computed: {

        thisOrganisation(){

            return this.organisations.filter(o => o.code === this.$route.params.code)[0];

        },

        qr(){
            return `${location.protocol}//${location.hostname}/organisations/join?code=${this.thisOrganisation.code}`;
        },

        ...mapState("organisations", ["organisations", "organisationMembers"]),
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