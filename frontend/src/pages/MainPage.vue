<template>
    <router-view
            v-bind:user="user"
            v-on:saveRaid="saveRaid"
            v-on:saveTermin="saveTermin"
            v-on:changeName="changeName"
            v-bind:raid="raid"
            v-bind:termin="termin">
    </router-view>
</template>

<script>
    export default {
        name: "MainPage",
        props: ['user'],
        data: () => ({
            raid: null,
            termin: null
        }),
        methods: {
            saveRaid: function(raid) {
                this.raid = raid;
                this.$router.push('raid');
            },
            saveTermin: function(termin) {
                this.termin = termin;
                this.$router.push('aufstellung');
            },
            changeName: function(name) {
                this.$emit('changeName', name);
            }
        }
    }
</script>

<style scoped>

</style>