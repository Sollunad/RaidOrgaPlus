<template>
    <TerminOverviewComp
            v-bind:archived="true">
    </TerminOverviewComp>
</template>

<script lang="ts">
	import Vue from 'vue';
    import TerminOverviewComp from "../../components/raid/TerminOverviewComp.vue";

    export default Vue.extend({
        name: "ArchivPage",
        components: {TerminOverviewComp},
    })
</script>

<style scoped>

</style>