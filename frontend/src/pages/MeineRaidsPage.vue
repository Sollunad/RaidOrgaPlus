<template>
    <div>
        <RaidOverviewComp/>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import RaidOverviewComp from "../components/raid/RaidOverviewComp.vue";

    export default Vue.extend({
        name: "MeineRaidsPage",
        components: {RaidOverviewComp},
    })
</script>

<style scoped>

</style>