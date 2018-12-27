<template>
    <router-view
            v-bind:user="user"
            v-on:saveRaidId="saveRaidId"
            v-bind:raidId="raidId"></router-view>
</template>

<script>
    export default {
        name: "MainPage",
        props: ['user'],
        data: () => ({
            raidId: 0
        }),
        methods: {
            saveRaidId: function(id) {
                this.raidId = id;
            }
        }
    }
</script>

<style scoped>

</style>