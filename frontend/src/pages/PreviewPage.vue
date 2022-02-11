<template>
	<div>
		<div v-if="aufstellungen">
			<v-container grid-list-md>
				<div>
					<span class="previewHeader"> {{ raidName }} </span>
				</div>
				<div style="margin-bottom: 8px">
					<span class="previewHeader"> {{ terminDate.dateString }} {{ time }} </span>
				</div>
				<v-layout row wrap>
					<v-flex v-for="aufstellung in aufstellungen" :key="aufstellung.id" xs12 md6 xl3>
						<AufstellungComp :aufstellung="aufstellung" :showExtraRoles="false" />
					</v-flex>
				</v-layout>
				<v-btn @click="backToMainPage" style="margin-top: 16px">
					Zurück zur Hauptseite
				</v-btn>
			</v-container>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import { MyActions } from "@/models/Store/State";
	import AufstellungComp from "../components/aufstellung/AufstellungComp.vue";
	import { Aufstellung } from "models/Aufstellung";
	import { Encounter } from "models/Encounter";
	import { terminDate } from "../../../models/Types";

	export default Vue.extend({
		name: "PreviewPage",
		components: { AufstellungComp },
		computed: {
			termin: function(): string {
				return this.$route.params.id;
			},
			aufstellungen: function(): (Aufstellung & Encounter)[] {
				return this.$vStore.getters.aufstellungen;
			},
			raidName: function(): string {
				return this.$vStore.getters.raidName;
			},
			terminDate: function(): terminDate {
				return this.$vStore.getters.terminDate;
			},
			time: function(): string {
				let time = "";

				if (this.terminDate) {
					time = this.terminDate.time;
					if (this.terminDate.endtime.trim()) {
						time += " - " + this.terminDate.endtime;
					}
					time += " Uhr";
				}

				return time;
			},
		},
		methods: {
			backToMainPage: function(): void {
				window.location.href = "/";
			},
		},
		created: async function(): Promise<void> {
			await this.$vStore.dispatch(MyActions.LoadAufstellungenPreview, this.termin);
		},
	});
</script>

<style scoped>
	.previewHeader {
		font-size: 24px;
		font-weight: 600;
	}
</style>
