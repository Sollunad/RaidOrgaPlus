<template>
    <div class="toolbar">
        Wochentag, Datum?
        <v-btn flat icon>
            <v-icon>add</v-icon>
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "TerminToolbarComp"
    }
</script>

<style scoped>
    .toolbar {
        font-size: 20px;
        font-weight: bold;
        padding: 0.5rem 1rem;
    }
</style>