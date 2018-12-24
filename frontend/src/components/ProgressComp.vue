<template>
    <div>
        <ProgressWingComp
            v-for="wing in bosses"
            v-bind:bosses="wing"
            v-bind:progress="progress"
            :key="wing[0].wing"></ProgressWingComp>
    </div>
</template>

<script>
    import ProgressWingComp from "./ProgressWingComp";
    import encounter from '../services/encounter';
    import progress from '../services/progress';

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
            }
        }

    }
</script>

<style scoped>

</style>