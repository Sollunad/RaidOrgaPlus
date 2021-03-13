<template>
    <v-toolbar color="#212121">
        <v-btn icon @click="back">
            <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title @click="toRaidDashboard" class="raidTitle">{{ raidName }}</v-toolbar-title>
    </v-toolbar>
</template>

<script lang="ts">
	import Vue from 'vue';

    export default Vue.extend({
        name: "RaidToolbarComp",
        methods: {
            back: function(): void {
                window.history.back();
            },
            toRaidDashboard: function(): void {
                this.$router.push('/raids');
                this.$router.push('/raid');
            }
        },
        computed: {
            raidName: function(): string {
                if (this.$vStore.getters.raid) return this.$vStore.getters.raid.name;
                else return '';
            }
        }
    })
</script>

<style scoped>
    .raidTitle {
        cursor: pointer;
    }
</style>