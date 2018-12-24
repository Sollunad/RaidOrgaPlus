<template>
    <div>
        <RaidOverviewComp
            v-if="user"
            v-bind:user="user">
        </RaidOverviewComp>
    </div>
</template>

<script>
    import RaidOverviewComp from "../components/RaidOverviewComp";

    export default {
        name: "MeineRaidsPage",
        components: {RaidOverviewComp},
        props: ['user']
    }
</script>

<style scoped>

</style>