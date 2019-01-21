<template>
    <v-list>
        <v-list-tile
                v-for="(user, index) in users"
                :key="index"

        >
            <v-list-tile-title @click="pick(user)">{{ user.name }}</v-list-tile-title>
        </v-list-tile>
    </v-list>
</template>

<script>
    import _raids from '../../services/endpoints/raids';

    export default {
        name: "MenuNameComp",
        props: ['raid'],
        asyncComputed: {
            users: async function() {
                if (this.raid) {
                    return _raids.listPlayers(this.raid.id);
                }
                else return [];
            }
        },
        methods: {
            pick: function(user) {
                this.$emit('pick', user);
            }
        }
    }
</script>

<style scoped>

</style>