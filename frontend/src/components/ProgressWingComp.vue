<template>
    <div>
        <ProgressBossComp
                v-for="boss in bosses"
                v-bind:boss="boss"
                v-bind:progress="progress"
                :key="boss.name">
        </ProgressBossComp>
    </div>
</template>

<script>
    import ProgressBossComp from "./ProgressBossComp";
    export default {
        name: "ProgressWingComp",
        components: {ProgressBossComp},
        props: ['bosses', 'progress'],
    }
</script>

<style scoped>

</style>