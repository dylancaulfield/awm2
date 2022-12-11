<template>
    <div>

        <v-container class="max-width">

            <v-alert v-show="error" type="error">Could not join organisation with provided code</v-alert>

            <v-card>

                <v-card-title>Join Organisation</v-card-title>

                <v-card-text>

                    <v-text-field v-model="code" label="Organisation Code"></v-text-field>

                </v-card-text>

                <v-card-actions>

                    <v-btn @click="join" color="secondary">Join</v-btn>
                </v-card-actions>

            </v-card>


        </v-container>

    </div>
</template>

<script>
import {post} from "@/utilities/request";

export default {
    components: {},

    methods: {

        async join() {

            try {
                await post("/api/organisations/join", {
                    organisationCode: this.code
                });
                await this.$router.push("/organisations");
            } catch (e) {
                this.error = true;
            }


        }

    },

    data() {
        return {
            code: this.$route.query.code,
            error: false
        }
    }
}
</script>

<style scoped>

</style>