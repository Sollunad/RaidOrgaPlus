<template>
    <div class="erfolge">
        <div v-for="wing in achievements">
            <ErfolgWingComponent
                v-bind:wing="wing"
                v-bind:allDone="allDone">
            </ErfolgWingComponent>
        </div>
    </div>
</template>

<script>
    import _gamedata from '../services/endpoints/gamedata';
    import _progress from '../services/endpoints/progress';
    import ErfolgWingComponent from "../components/erfolge/ErfolgWingComponent";

    export default {
        name: "ErfolgePage",
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
    .erfolge {
        margin: 3%;
    }
</style>