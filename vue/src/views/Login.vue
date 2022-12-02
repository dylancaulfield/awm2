<template>
<div>

    <v-container class="max-width">

        <v-card class="mt-6">

            <v-card-text>

                <v-form ref="loginForm" class="pt-4">

                    <h1 class="mb-6">Login</h1>

                    <v-divider class="mb-6"></v-divider>

                    <v-text-field required filled label="Email" v-model="user.email" :rules="[v => !!v || 'Email is required']"></v-text-field>
                    <v-text-field required filled type="password" label="Password" v-model="user.password" :rules="[v => !!v || 'Password is required']"></v-text-field>

                    <v-btn @click="performLogin" color="primary" >Login</v-btn>

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
    data(){
        return {
            user: {}
        }
    },
    methods:{

        performLogin(){

            if(!this.$refs.loginForm.validate()){
                return;
            }

            this.login(this.user)

        },

        ...mapActions("user", ["login"]),

    },
}
</script>

<style scoped>

</style>