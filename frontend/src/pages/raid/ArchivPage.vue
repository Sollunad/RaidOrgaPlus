<template>
    <TerminOverviewComp
            v-bind:archived="true">
    </TerminOverviewComp>
</template>

<script>
    import TerminOverviewComp from "../../components/raid/TerminOverviewComp";

    export default {
        name: "ArchivPage",
        components: {TerminOverviewComp},
    }
</script>

<style scoped>

</style>