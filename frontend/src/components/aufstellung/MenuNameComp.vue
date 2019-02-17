<template>
    <v-list>
        <v-list-tile
                v-for="(user, index) in angemeldet"
                :key="index"

        >
            <v-list-tile-title @click="pick(user)">
                <NameComp v-bind:user="user"></NameComp>
            </v-list-tile-title>
        </v-list-tile>
    </v-list>
</template>

<script>
    import NameComp from "../menu/NameComp";

    export default {
        name: "MenuNameComp",
        components: {NameComp},
        props: ['termin', 'anmeldungen', 'ersatz'],
        computed: {
            angemeldet: function() {
                const lfgUser = {
                    id: 1,
                    accname: 'LFG',
                    name: 'LFG'
                };
                let angemeldet = this.anmeldungen.filter(player => player.type < 2);
                angemeldet = angemeldet.concat(this.ersatz);
                angemeldet.push(lfgUser);
                return angemeldet;
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