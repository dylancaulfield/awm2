<template>
    <div>

        <v-container class="max-width">

            <v-card class="mt-6">

                <v-card-text>

                    <v-form ref="registerForm" class="pt-4">

                        <h1 class="mb-6">Create An Account</h1>

                        <v-divider class="mb-6"></v-divider>

                        <v-text-field required filled label="Name" v-model="user.name" :rules="[v => !!v || 'Name is required']"></v-text-field>
                        <v-text-field required filled label="Email" v-model="user.username" :rules="[v => !!v || 'Email is required']"></v-text-field>
                        <v-text-field required filled type="password" label="Password" v-model="user.password" :rules="[v => !!v || 'Password is required']"></v-text-field>
                        <v-text-field required filled type="password" label="Confirm Password" v-model="user.passwordConfirm" :rules="[v => v === this.user.password || 'Password does not match']"></v-text-field>

                        <v-btn @click="performLogin" color="primary" >Register</v-btn>

                        <v-divider class="mb-6 mt-6"></v-divider>

                        <p>
                            Already have an account?
                            <router-link to="/login">Login</router-link>
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
    name: "Register",
    data(){
        return {
            user: {}
        }
    },
    methods:{

        performLogin(){

            if(!this.$refs.registerForm.validate()){
                return;
            }

            this.register(this.user)

        },

        ...mapActions("user", ["register"]),

    },
}
</script>

<style scoped>

</style>