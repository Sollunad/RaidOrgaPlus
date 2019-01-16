<template>
    <div>
        <v-list>
            <template
                v-for="(user, index) in users">
                <ListSpielerComp
                        v-bind:user="user"
                        v-bind:key="user.id">
                </ListSpielerComp>
                <v-divider
                    v-if="index < users.length - 1"></v-divider>
            </template>
        </v-list>
        <v-btn
                v-if="role === 2"
                color="success">
            Spieler einladen
        </v-btn>
    </div>
</template>

<script>
    import ListSpielerComp from "../../components/raid/ListSpielerComp";
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