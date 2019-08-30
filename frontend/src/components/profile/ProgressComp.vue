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
                v-bind:width="width"
                v-bind:class="{ hasMargin: hasMarginBottom(index + 1) }"
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
        props: ['user', 'ownProfile', 'width'],
        data: () => ({
            bosses: [],
            progress: [],
        }),
        computed: {
            maxWing: function() {
                return this.bosses.length;
            }
        },
        methods: {
            hasMarginBottom: function(wing) {
                const lastWings = [4];
                return lastWings.includes(wing);
            }
        },
        created: async function() {
            this.bosses = await _encounter.listEncounterGrouped();
            if (this.ownProfile) this.progress = await _progress.progress();
            else this.progress = await _progress.progress(this.user.id);
        }
    }
</script>

<style scoped>
    .progress {
        width: fit-content;
    }

    .hasMargin {
        margin-bottom: 20px;
    }
</style>