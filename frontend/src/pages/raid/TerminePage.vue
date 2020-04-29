<template>
    <div>
        <TerminOverviewComp
                v-bind:archived="false">
        </TerminOverviewComp>
        <v-btn color="success" class="buttonAdd" :to="'/raid/neuerTermin'"
               v-if="showNeuerTermin">
            Neuer Termin
        </v-btn>
    </div>
</template>

<script>
    import TerminOverviewComp from "../../components/raid/TerminOverviewComp";

    export default {
        name: "TerminePage",
        components: {TerminOverviewComp},
        computed: {
            showNeuerTermin: function() {
                return this.$store.getters.raidRole > 0;
            }
        }
    }
</script>

<style scoped>
    .buttonAdd {
        margin-top: 1rem;
    }
</style>