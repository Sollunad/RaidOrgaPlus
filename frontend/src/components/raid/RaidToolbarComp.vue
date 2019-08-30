<template>
    <v-toolbar>
        <v-btn icon @click="back">
            <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title @click="toRaidDashboard" class="raidTitle">{{ raidName }}</v-toolbar-title>
    </v-toolbar>
</template>

<script>
    export default {
        name: "RaidToolbarComp",
        props: ['raid'],
        methods: {
            back: function() {
                window.history.back();
            },
            toRaidDashboard: function() {
                this.$router.push('/raids');
                this.$router.push('/raid');
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
    .raidTitle {
        cursor: pointer;
    }
</style>