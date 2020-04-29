<template>
    <div class="form">
        <NeuerTerminComp
                v-if="showNeuerTermin">
        </NeuerTerminComp>
    </div>
</template>

<script>
    import NeuerTerminComp from "../../components/raid/NeuerTerminComp";

    export default {
        name: "NeuerTerminPage",
        components: {NeuerTerminComp},
        computed: {
            showNeuerTermin: function() {
                return this.$store.getters.raidRole > 0;
            }
        }
    }
</script>

<style scoped>
    .form {
        margin: 5%;
    }
</style>