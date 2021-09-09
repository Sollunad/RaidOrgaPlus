<template>
	<v-file-input
		v-model="file"
		:loading="loading"
		:error="error"
		:success="success"
		accept=".evtc,.zevtc"
		label="Log-File (.evtc oder .zevtc)"
		class="upload"
	/>
</template>

<script lang="ts">
	import Vue from "vue";
	import _reports from "../../services/endpoints/reports";

	export default Vue.extend({
		name: "FileUploadComp",
		props: ["aufstellung"],
		data: () => ({
			btnText: "Senden",
			btnColor: "",
			loading: false,
			error: false,
			success: false,
			file: (null as unknown) as File
		}),
		methods: {
			submit: async function(): Promise<void> {
				this.error = false;
				this.success = false;
				const file = this.file;
				if (file != null && (file.name.includes(".evtc") || file.name.includes(".zevtc"))) {
					this.loading = true;

					const raid = this.$vStore.getters.raid;
					const response = await _reports.uploadReport(file, this.aufstellung.id, raid.dpsReportToken);

					this.loading = false;
					if (response.success) {
						this.$emit("uploadComplete", response.data);
						this.success = true;
					} else {
						this.error = true;
					}
				} else {
					this.loading = false;
					this.error = true;
				}
			}
		},
		watch: {
			file: function(): void {
				this.submit();
			}
		}
	});
</script>

<style scoped>
	.upload {
		margin: -5px 5px;
	}
</style>