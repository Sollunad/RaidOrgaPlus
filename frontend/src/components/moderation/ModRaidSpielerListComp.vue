<template>
    <div>
        <v-list two-line subheader>
            <ModRaidSpielerListEntryComp v-for="entry in spieler"
                                         :key="entry.id"
                                         :spieler="entry"
                                         :raid="raid"
                                         v-on:refresh="refresh">
            </ModRaidSpielerListEntryComp>
        </v-list>
    </div>
</template>

<script>
    import ModRaidSpielerListEntryComp from "./ModRaidSpielerListEntryComp";
    export default {
        name: "ModRaidSpielerListComp",
        components: {ModRaidSpielerListEntryComp},
        props: ['spieler', 'raid'],
        methods: {
            refresh: function() {
                this.$emit('refresh');
            }
        }
    }
</script>

<style scoped>

</style>