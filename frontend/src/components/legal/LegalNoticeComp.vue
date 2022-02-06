<template>
	<div>
		<span>
			<h1>Impressum</h1>
			<h2>Angaben gemäß § 5 TMG:</h2>
			<p><br />{{ this.data.jobTitle }}<br />{{ this.data.firstname + " " + this.data.lastname }}</p>
			<h3>Postanschrift:</h3>
			<p>{{ this.data.adress }}<br />{{ this.data.postalcode + " " + this.data.city }}<br /></p>
			<h3>Kontakt:</h3>
			<p>E-Mail: {{ this.data.email }}</p>
			<p />
			<p><br /></p>
			<p />
			<h2>Hinweise zur Website</h2>
			<p />
			<h2>Information gemäß § 36 VSBG</h2>
			<p>
				Gemäß § 36 VSBG (Verbraucherstreitbeilegungsgesetz – Gesetz über die alternative Streitbeilegung in
				Verbrauchersachen) erklärt der Betreiber dieser Website:
			</p>
			<p>
				Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer
				Verbraucherschlichtungsstelle teilzunehmen.
			</p>
			<p />
			<p>
				<em
					>Das Impressum wurde mit dem
					<a href="https://www.activemind.de/datenschutz/impressums-generator/"
						>Impressums-Generator der activeMind AG</a
					>
					erstellt.</em
				>
			</p>
		</span>
		<br />
		<v-spacer />
		<br />
		<DataPrivacyComp />
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import DataPrivacyComp from "@/components/legal/DataPrivacyComp.vue";
	import data from "./data.json";

	export default Vue.extend({
		name: "LegalNoticeComp",
		components: { DataPrivacyComp },
		data: () => ({
			data: data,
		}),
	});
</script>

<style scoped>
	h1,
	h2 {
		padding-bottom: 8px;
	}

	div {
		user-select: text;
	}
</style>
