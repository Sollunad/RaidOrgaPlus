<template>
    <TerminOverviewComp
            v-bind:raid="raid"
            v-bind:archived="true"
            v-on:saveTermin="saveTermin">
    </TerminOverviewComp>
</template>

<script>
    import TerminOverviewComp from "../../components/raid/TerminOverviewComp";
    export default {
        name: "ArchivPage",
        components: {TerminOverviewComp},
        props: ['raid'],
        methods: {
            saveTermin: function(termin) {
                this.$emit('saveTermin', termin);
            }
        }
    }
</script>

<style scoped>

</style>