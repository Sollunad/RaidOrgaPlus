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

<script lang="ts">
	import Vue from 'vue';
    import ModRaidSpielerListComp from "./ModRaidSpielerListComp.vue";
    import ModRaidSpielerEinladenComp from "./ModRaidSpielerEinladenComp.vue";
    import _moderation from '../../services/endpoints/moderation';

	type VInvitable = Vue & { refreshInvitable: () => Promise<void> }

    export default Vue.extend({
        name: "ModRaidListEntryComp",
        components: {ModRaidSpielerEinladenComp, ModRaidSpielerListComp},
        props: ['raid'],
        data: () => ({
            spieler: [] as any[],
        }),
        methods: {
            refresh: async function(): Promise<void> {
                this.spieler = await _moderation.getSpielerForRaid(this.raid.id);
                await (this.$refs.einladen as VInvitable).refreshInvitable();
            },
        },
        mounted: function() {
            this.spieler = this.raid.spieler;
        }
    })
</script>

<style scoped>

</style>