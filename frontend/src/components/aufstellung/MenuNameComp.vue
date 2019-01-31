<template>
    <v-list>
        <v-list-tile
                v-for="(user, index) in users"
                :key="index"

        >
            <v-list-tile-title @click="pick(user)">
                <NameComp v-bind:user="user"></NameComp>
            </v-list-tile-title>
        </v-list-tile>
    </v-list>
</template>

<script>
    import _termine from '../../services/endpoints/termine';
    import NameComp from "../menu/NameComp";

    export default {
        name: "MenuNameComp",
        components: {NameComp},
        props: ['termin'],
        asyncComputed: {
            users: async function() {
                if (this.termin) {
                    const allUsers = await _termine.getAnmeldungenForTermin(this.termin.id);
                    return allUsers.filter(player => player.type < 2);
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