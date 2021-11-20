<template>
	<div>
		<h2 class="header">Log Upload</h2>
		<v-divider class="divider" />
		<p>
			Für die Seite dps.report gibt es die Möglichkeit, beim hochladen von Logs einen User Token mit anzugeben.
			Mit diesem User Token, können frühere Logs die auf der Seite mit dem Token hochgeladen wurden, abgefragt
			werden. RO+ bietet die Möglichkeit an, einen solchen User Token für einen Raid zu hinterlegen oder auch
			einen automatisch generieren zu lassen, welcher dann auch für die Uploads der Logs entsprechend verwendet
			wird. Das hinterlegen eines User Tokens in RO+ ist freiwilig, wird aber empfohlen um z.B. später auch direkt
			über dps.report auf die Logs zugreifen zu können.
		</p>
		<v-dialog width="unset" v-model="dialog">
			<template v-slot:activator="{ on }">
				<v-btn v-on="on" class="lieutenantButton">
					User Token
				</v-btn>
			</template>
			<!-- <div class="container">
			</div> -->
			<v-card>
				<v-card-title>DPS Report - User Token</v-card-title>
				<v-card-text>
					<v-text-field label="User Token" v-model="token" @change="onChange" />
					<v-btn @click="generateToken">
						Generate User Token
					</v-btn>
				</v-card-text>
				<v-card-actions>
					<!-- Spacer for easy right alignment of the buttons -->
					<v-spacer />
					<v-btn @click="dialog = false">
						Close
					</v-btn>
					<v-btn @click="save">
						Save
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
	import Vue, { PropType } from "vue";
	import _raids from "@/services/endpoints/raids";
	import { userRaid } from "models/Types";

	export default Vue.extend({
		name: "LogUploadComp",
		props: {
			raid: Object as PropType<userRaid>,
			disabled: Boolean,
		},
		data: () => ({
			dialog: false,
			token: "",
			tokenSaved: false,
		}),
		methods: {
			generateToken: async function(): Promise<void> {
				const response = await _raids.generateUserToken(this.raid.id);
				if (response.success) {
					this.token = response.token;
					this.tokenSaved = true;
				}
			},
			save: async function(): Promise<void> {
				// call to the backend to set the token for the raid.
				if (!this.tokenSaved && this.token != null && this.token.trim() != null) {
					await _raids.setUserToken(this.raid.id, this.token);
				}
				this.dialog = false;
			},
			onChange(): void {
				if (this.tokenSaved) {
					this.tokenSaved = false;
				}
			},
		},
		created: async function(): Promise<void> {
			if (this.raid && this.raid.dpsReportToken) {
				// set the initial token equal to the one of the raid.
				this.token = this.raid.dpsReportToken;
				this.tokenSaved = true;
			}
		},
	});
</script>

<style scoped>
	.divider {
		border-width: thick 0 0 0;
		margin-bottom: 20px;
	}
</style>
