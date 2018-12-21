<template>
    <div>
        <p>Meine Raids: </p>
        <RaidComp
                v-for="raid in raids"
                v-bind:key="raid.id"
                v-bind:raid="raid"
        ></RaidComp>
    </div>
</template>

<script>
    import RaidComp from '../components/RaidComp';
    import db_raids from '../services/raids.js';

    export default {
        name: "MeineRaidsPage",
        components: {RaidComp},
        asyncComputed: {
            raids: function () {
                return db_raids.listForPlayer(2);
            }
        }
    }
</script>

<style scoped>

</style>