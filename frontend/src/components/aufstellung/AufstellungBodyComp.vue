<template>
	<div>
		<v-container grid-list-md>
			<v-layout row wrap>
				<v-flex v-for="i in 10" :key="i" xs6>
					<AufstellungElementComp :position="i" :aufstellung="aufstellung" :showExtraRoles="showExtraRoles" />
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import AufstellungElementComp from "./AufstellungElementComp.vue";

	export default Vue.extend({
		name: "AufstellungBodyComp",
		components: { AufstellungElementComp },
		props: ["aufstellung", "showExtraRoles"],
	});
</script>

<style scoped></style>
