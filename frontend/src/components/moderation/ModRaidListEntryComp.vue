<template>
    <v-expansion-panel-content>
        <template slot="header">
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>{{ raid.name }} {{ raid.active? '' : '(inaktiv)' }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
        <ModRaidSpielerEinladenComp :raid="raid" v-on:refresh="refresh" ref="einladen"></ModRaidSpielerEinladenComp>
        <ModRaidSpielerListComp :raid="raid" :spieler="spieler" v-on:refresh="refresh"></ModRaidSpielerListComp>
    </v-expansion-panel-content>
</template>

<script>
    import ModRaidSpielerListComp from "./ModRaidSpielerListComp";
    import ModRaidSpielerEinladenComp from "./ModRaidSpielerEinladenComp";
    import _moderation from '../../services/endpoints/moderation';

    export default {
        name: "ModRaidListEntryComp",
        components: {ModRaidSpielerEinladenComp, ModRaidSpielerListComp},
        props: ['raid'],
        data: () => ({
            spieler: [],
        }),
        methods: {
            refresh: async function() {
                this.spieler = await _moderation.getSpielerForRaid(this.raid.id);
                this.$refs.einladen.refreshInvitable();
            }
        },
        mounted: function() {
            this.spieler = this.raid.spieler;
        }
    }
</script>

<style scoped>

</style>