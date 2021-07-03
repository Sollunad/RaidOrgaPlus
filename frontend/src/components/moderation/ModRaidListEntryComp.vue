<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>{{ raid.name }} {{ raid.active ? '' : '(inaktiv)' }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <ModRaidSpielerEinladenComp :raid="raid" v-on:refresh="refresh" ref="einladen" />
			<ModRaidEntfernen :disabled="disable" :raid="raid" v-on:refreshRaids="refreshRaids" />
            <ModRaidSpielerListComp :raid="raid" :spieler="spieler" v-on:refresh="refresh" />
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script lang="ts">
	import Vue, { PropType } from 'vue';
    import ModRaidSpielerListComp from "./ModRaidSpielerListComp.vue";
    import ModRaidSpielerEinladenComp from "./ModRaidSpielerEinladenComp.vue";
	import ModRaidEntfernen from "./ModRaidEntfernen.vue";
    import _moderation from '../../services/endpoints/moderation';
	import { ModRaid } from "models/Raid";
	import { Spieler } from "models/Spieler";
	import { UserRole } from '../../../../models/Enums';

	type VInvitable = Vue & { refreshInvitable: () => Promise<void> }

    export default Vue.extend({
        name: "ModRaidListEntryComp",
        components: { ModRaidSpielerEinladenComp, ModRaidSpielerListComp, ModRaidEntfernen },
		props: {
			raid: Object as PropType<ModRaid>
		},
        data: () => ({
            spieler: [] as Spieler[],
        }),
		computed: {
			disable: function(): boolean {
				return this.spieler.length > 0 || this.$vStore.getters.loggedInUser.role <= UserRole.Maz;
			}
		},
        methods: {
            refresh: async function(): Promise<void> {
                this.spieler = await _moderation.getSpielerForRaid(this.raid.id);
                await (this.$refs.einladen as VInvitable).refreshInvitable();
            },
			refreshRaids: function(): void {
				this.$emit('refresh');
			}
        },
        mounted: function() {
            this.spieler = this.raid.spieler;
        }
    })
</script>

<style scoped>

</style>