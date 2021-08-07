<template>
    <div>
		<h1>Einstellungen</h1>
		<LieutenantComp :raid="raid" :disabled="!isRaidLead" />
		<!-- <AnmeldeEinstellungComp /> -->
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import AnmeldeEinstellungComp from '@/components/raid/AnmeldeEinstellungComp.vue';
	import LieutenantComp from '@/components/raid/LieutenantComp.vue';
	import { userRaid } from 'models/Types';

	export default Vue.extend({
		name: "RaidEinstellungenPage",
		components: {
			LieutenantComp,
			// AnmeldeEinstellungComp
		},
		computed: {
			raid: function(): userRaid {
				return this.$vStore.getters.raid;
			},
			isRaidLead: function(): boolean {
				return this.$vStore.getters.raidRole > 1;
			}
		}
	})
</script>

<style scoped>
</style>