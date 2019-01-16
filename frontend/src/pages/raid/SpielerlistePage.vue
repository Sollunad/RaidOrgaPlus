<template>
    <div>
        <v-btn
                v-if="role === 2"
                color="success">
            Spieler einladen
        </v-btn>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex
                        v-for="user in users"
                        :key="user.id"
                        xs12 sm6 lg4 xl3>
                    <ListSpielerComp
                            v-bind:user="user"
                            v-bind:key="user.id">
                    </ListSpielerComp>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import ListSpielerComp from "../../components/raid/SpielerComp";
    import _raids from '../../services/endpoints/raids';

    export default {
        name: "SpielerlistePage",
        components: {ListSpielerComp},
        props: ['raid', 'role'],
        asyncComputed: {
            users: async function() {
                if (this.raid) {
                    return _raids.listPlayers(this.raid.id);
                }
                else return [];
            }
        }
    }
</script>

<style scoped>

</style>