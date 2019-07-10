<template>
    <div>
        <TerminOverviewComp
                v-bind:raid="raid"
                v-bind:archived="false"
                v-on:saveTermin="saveTermin">
        </TerminOverviewComp>
        <v-btn color="success" class="buttonAdd" :to="'/raid/neuerTermin'"
               v-if="role > 0">
            Neuer Termin
        </v-btn>
    </div>
</template>

<script>
    import TerminOverviewComp from "../../components/raid/TerminOverviewComp";

    export default {
        name: "TerminePage",
        components: {TerminOverviewComp},
        props: ['raid', 'role'],
        methods: {
            saveTermin: function(termin) {
                this.$emit('saveTermin', termin);
            }
        }
    }
</script>

<style scoped>
    .buttonAdd {
        margin-top: 1rem;
    }
</style>