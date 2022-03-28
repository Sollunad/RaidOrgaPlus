<template>
	<div class="container">
		<iframe
			src="https://docs.google.com/document/d/e/2PACX-1vQdk_8rIq7oIZEqA7mNKfm2vk1Ayhgj43x5OYsz0XB9-1zm7zCmNLMUOE8Ws8NGhjmztixfHgjqYl02/pub?embedded=true"
			class="iframe"
		></iframe>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";

	export default Vue.extend({
		name: "HelpPage",
	});
</script>

<style scoped>
	.container {
		display: flex;
		width: inherit;
		height: 95%;
	}

	.iframe {
		flex-grow: 1;
	}
</style>
