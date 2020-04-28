<template>
    <div>
        <RaidOverviewComp
            v-on:saveRaid="saveRaid">
        </RaidOverviewComp>
    </div>
</template>

<script>
    import RaidOverviewComp from "../components/raid/RaidOverviewComp";

    export default {
        name: "MeineRaidsPage",
        components: {RaidOverviewComp},
        methods: {
            saveRaid: function(raid) {
                this.$emit('saveRaid', raid);
            }
        }
    }
</script>

<style scoped>

</style>