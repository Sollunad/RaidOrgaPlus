<template>
    <div>
        <h1>Weekly Progress</h1>
        <p></p>
        <ProgressWingComp
                v-for="wing in bosses"
                v-bind:bosses="wing"
                v-bind:progress="progress"
                :key="wing[0].wing"></ProgressWingComp>
    </div>
</template>

<script>
    import ProgressWingComp from "./ProgressWingComp";
    import _encounter from '../../services/endpoints/gamedata';
    import _progress from '../../services/endpoints/progress';

    export default {
        name: "ProgressComp",
        components: {ProgressWingComp},
        props: ['user'],
        asyncComputed: {
            bosses: function() {
                return _encounter.listEncounter();
            },
            progress: function() {
                if (this.user) return _progress.progress();
            }
        }
    }
</script>

<style scoped>

</style>