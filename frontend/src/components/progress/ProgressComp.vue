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
    import _encounter from '../../services/endpoints/encounter';
    import _progress from '../../services/endpoints/progress';
    import _users from '../../services/endpoints/users';

    export default {
        name: "ProgressComp",
        components: {ProgressWingComp},
        props: ['user'],
        asyncComputed: {
            bosses: function() {
                return _encounter.list();
            },
            progress: function() {
                if (this.user) return _progress.progress(this.user.id);
            },
            hasNoApi: async function() {
                if (this.user) return !(await _users.hasApi(this.user.id));
            }
        }

    }
</script>

<style scoped>

</style>