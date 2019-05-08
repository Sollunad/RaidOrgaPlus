<template>
    <v-list>
        <v-list-tile
                v-for="(aufstellung) in filtered"
                :key="aufstellung.id">
            <v-list-tile-title @click="pick(aufstellung)">{{ aufstellung.name }}</v-list-tile-title>
        </v-list-tile>
    </v-list>
</template>

<script>
    import _aufstellungen from '../../services/endpoints/aufstellungen';

    export default {
        name: "MenuAllBossesComp",
        props: ['all', 'aufstellung'],
        computed: {
            filtered: function() {
                return this.all.filter(a => a.id !== this.aufstellung.id);
            }
        },
        methods: {
            pick: async function(aufstellung) {
                await _aufstellungen.copyNames(aufstellung.id, this.aufstellung.id);
                this.$emit('refresh');
            }
        },
        created: function() {

        }
    }
</script>

<style scoped>

</style>