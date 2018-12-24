<template>
    <div>
        <TerminOverviewComp
                v-bind:raid="raid"
                v-bind:archived="false">
        </TerminOverviewComp>
        <p v-if="role > 0">Neuer Termin</p>
    </div>
</template>

<script>
    import TerminOverviewComp from "../components/TerminOverviewComp";

    export default {
        name: "TerminePage",
        components: {TerminOverviewComp},
        props: ['raid', 'role']
    }
</script>

<style scoped>

</style>