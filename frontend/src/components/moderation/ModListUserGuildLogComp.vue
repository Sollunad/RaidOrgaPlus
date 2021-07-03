<template>
    <div class="log">
        <ModListUserGuildLogEntryComp v-for="entry in log" :key="entry.id" :entry="entry"></ModListUserGuildLogEntryComp>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import ModListUserGuildLogEntryComp from "./ModListUserGuildLogEntryComp.vue";

    export default Vue.extend({
        name: "ModListUserGuildLogComp",
        components: {ModListUserGuildLogEntryComp},
        props: ['log']
    })
</script>

<style scoped lang="scss">
    .log {
        background-color: $dialogBox;
        padding: 10px;
    }
</style>