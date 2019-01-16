<template>
    <v-toolbar>
        <v-btn flat icon @click="back">
            <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title>{{ raidName }}</v-toolbar-title>
    </v-toolbar>
</template>

<script>
    export default {
        name: "RaidToolbarComp",
        props: ['raid'],
        methods: {
            back: function() {
                window.history.back();
            }
        },
        computed: {
            raidName: function() {
                if (this.raid) return this.raid.name;
                else return '';
            }
        }
    }
</script>

<style scoped>

</style>