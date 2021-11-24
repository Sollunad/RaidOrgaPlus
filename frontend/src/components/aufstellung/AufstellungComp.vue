<template>
	<div class="aufstellung">
		<AufstellungHeaderComp :aufstellung="aufstellung" :copyActive="copyActive" :toggleCopy="toggleCopy" />
		<AufstellungBodyComp v-if="!copyActive" :aufstellung="aufstellung" :showExtraRoles="showExtraRoles" />
		<MenuAufstellungenComp v-else :aufstellung="aufstellung" :stopCopy="stopCopy" class="menu" />
	</div>
</template>

<script lang="ts">
	import Vue, { PropType } from "vue";
	import AufstellungHeaderComp from "./AufstellungHeaderComp.vue";
	import AufstellungBodyComp from "./AufstellungBodyComp.vue";
	import MenuAufstellungenComp from "./MenuAufstellungenComp.vue";
	import { Encounter } from "models/Encounter";
	import { Aufstellung } from "models/Aufstellung";

	export default Vue.extend({
		name: "AufstellungComp",
		components: { MenuAufstellungenComp, AufstellungBodyComp, AufstellungHeaderComp },
		props: {
			aufstellung: Object as PropType<Aufstellung & Encounter>,
			showExtraRoles: Boolean,
		},
		data: () => ({
			copyActive: false,
		}),
		methods: {
			stopCopy: function(): void {
				this.copyActive = false;
			},
			toggleCopy: function(): void {
				this.copyActive = !this.copyActive;
			},
		},
	});
</script>

<style scoped lang="scss">
	.aufstellung {
		background-color: $playerCard;
		width: 100%;
		height: 100%;
		box-shadow: 1px 1px 3px black;
	}
</style>
