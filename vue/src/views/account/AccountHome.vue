<template>
    <div>

        <h1>Account</h1>

    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "AccountHome",

    computed: {

        ...mapState("user", ["user"])

    },

}
</script>

<style scoped>

</style>