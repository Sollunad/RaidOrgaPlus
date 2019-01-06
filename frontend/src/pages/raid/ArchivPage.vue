<template>
    <TerminOverviewComp
            v-bind:raid="raid"
            v-bind:archived="true"
            v-on:saveTerminId="saveTerminId">
    </TerminOverviewComp>
</template>

<script>
    import TerminOverviewComp from "../../components/raid/TerminOverviewComp";
    export default {
        name: "ArchivPage",
        components: {TerminOverviewComp},
        props: ['raid'],
        methods: {
            saveTerminId: function(id) {
                this.$emit('saveTerminId', id);
            }
        }
    }
</script>

<style scoped>

</style>