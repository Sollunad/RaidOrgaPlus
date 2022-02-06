<template>
	<div>
		<LegalNoticeComp />
		<br />
		<v-divider />
		<br />
		<DataPrivacyComp />
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import LegalNoticeComp from "../components/legal/LegalNoticeComp.vue";
	import DataPrivacyComp from "../components/legal/DataPrivacyComp.vue";

	export default Vue.extend({
		name: "LegalPage",
		components: { LegalNoticeComp, DataPrivacyComp },
	});
</script>
