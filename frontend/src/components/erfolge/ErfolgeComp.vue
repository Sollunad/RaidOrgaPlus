<template>
    <div>
        <div class="headline">Erfolge</div>
        <div class="spinner" v-if="achievements.length === 0">
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

<script lang="ts">
	import Vue from 'vue';
    import _gamedata from '../../services/endpoints/gamedata';
    import _progress from '../../services/endpoints/progress';
    import ErfolgWingComponent from "./ErfolgWingComponent.vue";

    export default Vue.extend({
        name: "ErfolgeComp",
        components: {ErfolgWingComponent},
        props: ['ownProfile', 'user'],
        data: () => ({
            achievements: [] as any[],
            allDone: [] as any[],
        }),
        created: async function(): Promise<void> {
            this.achievements = await _gamedata.getAchievements();

            if (this.ownProfile) {
				this.allDone = await _progress.achievements(null);
			}
            else {
				this.allDone = await _progress.achievements(this.user.id);
			}
        }
    })
</script>

<style scoped>
    .headline {
        margin-bottom: 15px;
    }
</style>