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

<script lang="ts">
	import Vue from 'vue';
    import TerminOverviewComp from "../../components/raid/TerminOverviewComp.vue";

    export default Vue.extend({
        name: "TerminePage",
        components: {TerminOverviewComp},
        computed: {
            showNeuerTermin: function(): boolean {
                return this.$store.getters.raidRole > 0;
            }
        }
    })
</script>

<style scoped>
    .buttonAdd {
        margin-top: 1rem;
    }
</style>