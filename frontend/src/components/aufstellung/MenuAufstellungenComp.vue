<template>
    <v-list>
        <v-list-tile
                v-for="(aufstellung) in filtered"
                :key="aufstellung.id"
                @click="pick(aufstellung)">
            <v-list-tile-title>{{ aufstellung.name }}</v-list-tile-title>
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
                await _aufstellungen.copyElements(aufstellung.id, this.aufstellung.id);
                this.$emit('refresh');
            }
        },
        created: function() {

        }
    }
</script>

<style scoped>

</style>