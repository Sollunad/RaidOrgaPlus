<template>
    <p>Raid Dashboard von {{ raid.name }}</p>
</template>

<script>
    import db_raids from '../services/raids.js';

    export default {
        name: "RaidDashboardPage",
        computed: {
            raidId: function() {
                return localStorage.raidId;
            }
        },
        asyncComputed: {
            raid: function () {
                return db_raids.give(this.raidId);
            }
        }
    }
</script>

<style scoped>

</style>