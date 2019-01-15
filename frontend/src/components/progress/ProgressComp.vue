<template>
    <div>
        <div v-if="hasNoApi">
            <p>Gib einen API-Key im Profil an, um hier deinen wöchentlichen Raid-Progress zu sehen!</p>
        </div>
        <div v-else>
            <ProgressWingComp
                    v-for="wing in bosses"
                    v-bind:bosses="wing"
                    v-bind:progress="progress"
                    :key="wing[0].wing"></ProgressWingComp>
        </div>
    </div>
</template>

<script>
    import ProgressWingComp from "./ProgressWingComp";
    import encounter from '../../services/endpoints/encounter';
    import progress from '../../services/endpoints/progress';
    import user from '../../services/endpoints/users';

    export default {
        name: "ProgressComp",
        components: {ProgressWingComp},
        props: ['user'],
        asyncComputed: {
            bosses: function() {
                return encounter.list();
            },
            progress: function() {
                if (this.user) return progress.progress(this.user.id);
            },
            hasNoApi: async function() {
                if (this.user) return !(await user.hasApi(this.user.id));
            }
        }

    }
</script>

<style scoped>

</style>