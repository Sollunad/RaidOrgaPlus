<template>
    <div>
        <RaidOverviewComp
            v-bind:user="user">
        </RaidOverviewComp>
    </div>
</template>

<script>
    import RaidOverviewComp from "../components/RaidOverviewComp";
    import session from '../services/session.js';

    export default {
        name: "MeineRaidsPage",
        components: {RaidOverviewComp},
        computed: {
            loggedIn: function() {
                return this.user !== 0;
            }
        },
        asyncComputed: {
            user: function() {
                return session.getUser(localStorage.session);
            }
        }
    }
</script>

<style scoped>

</style>