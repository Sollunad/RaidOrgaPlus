<template>
    <v-toolbar>
        <v-btn flat icon @click="back">
            <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title>{{ raidName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn flat icon
               v-if="role === 2"
               :to="'/raid/einstellungen'"
        >
            <v-icon>settings</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
    export default {
        name: "RaidToolbarComp",
        props: ['raid', 'role'],
        methods: {
            back: function() {
                window.history.back();
            }
        },
        computed: {
            raidName: function() {
                if (this.raid) return this.raid.name;
            }
        }
    }
</script>

<style scoped>

</style>