<template>
    <router-view
            v-bind:user="user"
            v-on:saveRaid="saveRaid"
            v-bind:raid="raid"></router-view>
</template>

<script>
    export default {
        name: "MainPage",
        props: ['user'],
        data: () => ({
            raid: null
        }),
        methods: {
            saveRaid: function(raid) {
                this.raid = raid;
            }
        }
    }
</script>

<style scoped>

</style>