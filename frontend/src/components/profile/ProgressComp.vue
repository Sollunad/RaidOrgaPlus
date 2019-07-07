<template>
    <div class="progress" v-if="ownProfile || progress">
        <div class="headline">Weekly Progress</div>
        <p></p>
        <ProgressWingComp
                v-for="(wing, index) in bosses"
                v-bind:bosses="wing"
                v-bind:wing="index + 1"
                v-bind:maxWing="maxWing"
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
        props: ['user', 'ownProfile'],
        asyncComputed: {
            bosses: function() {
                return _encounter.listEncounterGrouped();
            },
            progress: function() {
                if (this.ownProfile) return _progress.progress();
                else return _progress.progress(this.user.id);
            }
        },
        computed: {
            maxWing: function() {
                return this.bosses.length;
            }
        }
    }
</script>

<style scoped>
    .progress {
        width: fit-content;
    }
</style>