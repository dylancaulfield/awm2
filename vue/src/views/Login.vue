<template>
    <div>

        <v-container class="max-width">

            <v-alert type="error" v-show="this.error" class="mb-6 mt-6">Oops! No user found with those
                credentials
            </v-alert>

            <v-alert dismissible type="info" v-show="this.$route.query.redirect" class="mb-6 mt-6">You must be
                authenticated to access settings
            </v-alert>

            <v-card class="mt-6">

                <v-card-text>

                    <v-form @submit="performLogin" ref="loginForm" class="pt-4">

                        <h1 class="mb-6">Login</h1>

                        <v-divider class="mb-6"></v-divider>

                        <v-text-field required filled type="email" label="Email" v-model="user.username"
                                      :rules="[v => !!v || 'Email is required']"></v-text-field>
                        <v-text-field required filled type="password" label="Password" v-model="user.password"
                                      :rules="[v => !!v || 'Password is required']"></v-text-field>

                        <v-btn type="submit" @click="performLogin" color="primary">Login</v-btn>

                        <v-divider class="mb-6 mt-6"></v-divider>

                        <p>
                            New to Geo Timesheet?
                            <router-link to="/register">Create an account</router-link>
                        </p>

                    </v-form>

                </v-card-text>


            </v-card>


        </v-container>

    </div>
</template>

<script>
import {mapActions} from "vuex";


export default {
    name: "Login",
    data() {
        return {
            user: {},
            error: false,
        }
    },
    methods: {

        async performLogin(event) {

            event.preventDefault();

            if (!this.$refs.loginForm.validate()) {
                return;
            }

            if (!await this.login(this.user)) {
                return this.error = true;
            }

            await this.fetchUser();
            await this.$router.push("/");

        },

        ...mapActions("user", ["login", "fetchUser"]),

    },

    beforeRouteLeave(to, from, next) {

        const redirect = sessionStorage.getItem("redirect")

        if (redirect) {
            sessionStorage.removeItem("redirect");
            return next(JSON.parse(redirect));
        }

        next()

    },
}
</script>

<style scoped>

</style>