<template>
	<div class="raidPage">
		<RaidToolbarComp/>
		<router-view
				class="raidPageRouter">
		</router-view>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import RaidToolbarComp from "../components/raid/RaidToolbarComp.vue";

    export default Vue.extend({
        name: "RaidPage",
        components: { RaidToolbarComp },
        created: function(): void {
            if (!this.$vStore.getters.raid) {
				window.location.href = '/#/raids';
			}
        }
    })
</script>

<style scoped>
    @media only screen and (min-width: 600px) {
        .raidPage {
            margin: 0;
        }

        .raidPageRouter {
            margin: 1%;
        }
    }
</style>