<template>
    <v-expansion-panel-content>
        <template slot="header">
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>{{ raid.name }} {{ raid.active? '' : '(inaktiv)' }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
        <ModRaidSpielerEinladenComp :raid="raid" v-on:invited="invited"></ModRaidSpielerEinladenComp>
        <ModRaidSpielerListComp :spieler="raid.spieler"></ModRaidSpielerListComp>
    </v-expansion-panel-content>
</template>

<script>
    import ModRaidSpielerListComp from "./ModRaidSpielerListComp";
    import ModRaidSpielerEinladenComp from "./ModRaidSpielerEinladenComp";

    export default {
        name: "ModRaidListEntryComp",
        components: {ModRaidSpielerEinladenComp, ModRaidSpielerListComp},
        props: ['raid'],
        methods: {
            invited: function() {
                this.$emit('invited');
            }
        }
    }
</script>

<style scoped>

</style>