<template>
    <div>

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