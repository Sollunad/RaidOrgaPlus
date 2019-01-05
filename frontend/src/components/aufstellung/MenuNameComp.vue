<template>
    <v-list>
        <v-list-tile
                v-for="(user, index) in users"
                :key="index"
        >
            <v-list-tile-title @click="pick(user.id)">{{ user.name }}</v-list-tile-title>
        </v-list-tile>
    </v-list>
</template>

<script>
    import raids from '../../services/raids';

    export default {
        name: "MenuNameComp",
        props: ['raid'],
        asyncComputed: {
            users: async function() {
                if (this.raid) {
                    return raids.listPlayers(this.raid.id);
                }
                else return [];
            }
        },
        methods: {
            pick: function(id) {
                this.$emit('pick', id);
            }
        }
    }
</script>

<style scoped>

</style>