<template>
    <div>
        <div class="spinner" v-if="!achievements">
            <v-progress-circular
                    indeterminate
                    color="primary"
            ></v-progress-circular>
        </div>
        <div v-for="wing in achievements" :key="wing.wing">
            <ErfolgWingComponent
                    v-bind:wing="wing"
                    v-bind:allDone="allDone">
            </ErfolgWingComponent>
        </div>
    </div>
</template>

<script>
    import _gamedata from '../../services/endpoints/gamedata';
    import _progress from '../../services/endpoints/progress';
    import ErfolgWingComponent from "./ErfolgWingComponent";

    export default {
        name: "ErfolgeComp",
        components: {ErfolgWingComponent},
        data: () => ({
            achievements: [],
            allDone: [],
        }),
        created: async function() {
            this.achievements = await _gamedata.getAchievements();
            this.allDone = await _progress.achievements();
        }
    }
</script>

<style scoped>

</style>