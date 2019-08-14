<template>
    <div>
        <v-list two-line subheader>
            <ModRaidSpielerListEntryComp v-for="entry in spieler" :key="entry.id" :spieler="entry"></ModRaidSpielerListEntryComp>
        </v-list>
    </div>
</template>

<script>
    import ModRaidSpielerListEntryComp from "./ModRaidSpielerListEntryComp";
    export default {
        name: "ModRaidSpielerListComp",
        components: {ModRaidSpielerListEntryComp},
        props: ['spieler'],
    }
</script>

<style scoped>

</style>