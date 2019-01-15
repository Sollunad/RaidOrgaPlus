<template>
    <v-list>
        <v-list-tile
                v-for="(user, index) in users"
                :key="index"
                class="unselectable"
        >
            <v-list-tile-title @click="pick(user.id)">{{ user.name }}</v-list-tile-title>
        </v-list-tile>
    </v-list>
</template>

<script>
    import raids from '../../services/endpoints/raids';

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
    .unselectable {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
    }
</style>