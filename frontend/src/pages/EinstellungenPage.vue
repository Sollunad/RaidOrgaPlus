<template>
	<div class="profile">
		<EinstellungenAPIKeyComp />
		<p></p>
		<v-divider></v-divider>
		<p></p>
		<EinstellungenEmailComp />
		<p></p>
		<v-divider></v-divider>
		<p></p>
		<EinstellungenPasswordComp />
		<p></p>
		<v-divider></v-divider>
		<p></p>
		<EinstellungenThemeComp />
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import EinstellungenAPIKeyComp from "../components/einstellungen/EinstellungenAPIKeyComp.vue";
	import EinstellungenEmailComp from "../components/einstellungen/EinstellungenEmailComp.vue";
	import EinstellungenPasswordComp from "../components/einstellungen/EinstellungenPasswordComp.vue";
	import EinstellungenThemeComp from "../components/einstellungen/EinstellungenThemeComp.vue";

	export default Vue.extend({
		name: "EinstellungenPage",
		components: {
			EinstellungenPasswordComp,
			EinstellungenEmailComp,
			EinstellungenAPIKeyComp,
			EinstellungenThemeComp,
		},
	});
</script>

<style scoped>
	.profile {
		margin: 5% 10%;
	}
</style>
