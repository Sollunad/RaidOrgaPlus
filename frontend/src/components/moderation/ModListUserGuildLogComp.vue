<template>
    <div class="log">
        <ModListUserGuildLogEntryComp v-for="entry in log" :key="entry.id" :entry="entry"></ModListUserGuildLogEntryComp>
    </div>
</template>

<script>
    import ModListUserGuildLogEntryComp from "./ModListUserGuildLogEntryComp";
    export default {
        name: "ModListUserGuildLogComp",
        components: {ModListUserGuildLogEntryComp},
        props: ['log']
    }
</script>

<style scoped>
    .log {
        background-color: #444444;
        padding: 10px;
    }
</style>