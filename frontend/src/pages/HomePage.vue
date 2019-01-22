<template>
    <div>
        <div v-if="hasNoApi">
            <p>Gib einen API-Key im Profil an, um hier deinen wöchentlichen Raid-Progress zu sehen!</p>
        </div>
        <div v-else>
            <ProgressComp
                    v-bind:user="user"
                    class="homecomp">
            </ProgressComp>
            <InsightsComp
                    v-bind:user="user"
                    class="homecomp">
            </InsightsComp>
        </div>
    </div>
</template>

<script>
    import ProgressComp from "../components/progress/ProgressComp";
    import InsightsComp from "../components/progress/InsightsComp";
    import _users from '../services/endpoints/users';

    export default {
        name: "HomePage",
        props: ['user'],
        components: {InsightsComp, ProgressComp},
        asyncComputed: {
            hasNoApi: async function() {
                if (this.user) return !(await _users.hasApi());
            }
        }
    }
</script>

<style scoped>
    .homecomp {
        margin: 10px;
    }
</style>