<template>
    <div>

        <v-btn>Create new organisation</v-btn>

        <p :key="org.id" v-for="org in organisations">{{org.name}}</p>

    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "Organisations",

    computed: {
        ...mapState("organisations", ["organisations"])
    }

}
</script>

<style scoped>

</style>