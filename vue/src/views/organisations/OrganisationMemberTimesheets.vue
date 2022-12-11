<template>

    <div></div>

</template>

<script>
import {mapActions, mapState} from "vuex";

export default {

    async mounted(){

    },

    computed: {

    },

    methods: {

        ...mapActions("organisations", ["fetchOrganisations", "fetchOrganisationMemberData"])

    }

}
</script>

<style scoped>

</style>