<template>
    <div>

        <v-container class="max-width">

            <h2>Hi {{ user.name }}</h2>

            <v-divider class="my-4"></v-divider>

            <h2 class="mb-4">Organisations</h2>

            <div class="mb-4">
                <v-btn color="primary" @click="dialog = true">New</v-btn>
                <router-link to="/organisations/join">
                    <v-btn color="secondary" class="ml-2">Join</v-btn>
                </router-link>
            </div>

            <v-dialog
                v-model="dialog"
                width="500"
            >

                <v-card>
                    <v-card-title>
                        Create Organisation
                    </v-card-title>

                    <v-card-text>

                        <v-text-field label="Organisation Name" :rules="[v => !!v || 'Name is required']" v-model="name"></v-text-field>

                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="create"
                        >
                            Create
                        </v-btn>
                        <v-btn
                            text
                            color="secondary"
                            @click="dialog = false"
                        >
                            Cancel
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-card :key="i" v-for="(org, i) in organisations" class="mb-4">

                <v-card-title>{{ org.name }}</v-card-title>

                <v-card-actions>
                    <router-link :to="`/organisations/${org.code}`">
                        <v-btn
                            text
                            color="secondary"
                        >View</v-btn>
                    </router-link>
                </v-card-actions>

            </v-card>

        </v-container>


    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {post} from "@/utilities/request";

export default {

    data() {
        return {
            dialog: false,
            name: null
        }
    },

    mounted() {
        this.fetchOrganisations()
    },

    computed: {
        ...mapState("organisations", ["organisations"]),
        ...mapState("user", ["user"])
    },

    methods: {

        async create() {

            if(!this.name){
                return;
            }

            await post("/api/organisations/create", {
                name: this.name
            });

            await this.fetchOrganisations();
            this.dialog = false;


        },

        ...mapActions("organisations", ["fetchOrganisations"])

    }

}
</script>

<style scoped>

</style>