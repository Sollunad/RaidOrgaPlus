<template>
    <div>
        <RaidOverviewComp
            v-if="user"
            v-bind:user="user"
            v-on:saveRaidId="saveRaidId">
        </RaidOverviewComp>
    </div>
</template>

<script>
    import RaidOverviewComp from "../components/RaidOverviewComp";

    export default {
        name: "MeineRaidsPage",
        components: {RaidOverviewComp},
        props: ['user'],
        methods: {
            saveRaidId: function(id) {
                this.$emit('saveRaidId', id);
            }
        }
    }
</script>

<style scoped>

</style>