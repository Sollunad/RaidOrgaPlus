<template>
    <TerminOverviewComp
            v-bind:raid="raid"
            v-bind:archived="true">
    </TerminOverviewComp>
</template>

<script>
    import TerminOverviewComp from "../components/TerminOverviewComp";
    export default {
        name: "ArchivPage",
        components: {TerminOverviewComp},
        props: ['raid']
    }
</script>

<style scoped>

</style>