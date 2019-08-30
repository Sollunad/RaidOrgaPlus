<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>{{ raid.name }} {{ raid.active? '' : '(inaktiv)' }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <ModRaidSpielerEinladenComp :raid="raid" v-on:refresh="refresh" ref="einladen"></ModRaidSpielerEinladenComp>
            <ModRaidSpielerListComp :raid="raid" :spieler="spieler" v-on:refresh="refresh"></ModRaidSpielerListComp>
        </v-expansion-panel-content>
    </v-expansion-panel>
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