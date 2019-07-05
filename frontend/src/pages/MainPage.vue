<template>
    <router-view
            v-bind:user="user"
            v-on:saveRaid="saveRaid"
            v-on:changeName="changeName"
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
                this.$router.push('raid');
            },
            changeName: function(name) {
                this.$emit('changeName', name);
            }
        }
    }
</script>

<style scoped>

</style>