<template>
    <div>
        <SpielerEinladenComp
            v-if="role > 0"
            v-bind:raid="raid">
        </SpielerEinladenComp>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex
                        v-for="listuser in users"
                        :key="listuser.id"
                        xs12 sm6 lg4 xl3>
                    <SpielerComp
                            v-bind:user="listuser"
                            v-bind:role="role"
                            v-bind:self="isSelf(listuser)"
                            v-bind:filter="filter">
                    </SpielerComp>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import SpielerComp from "../../components/raid/SpielerComp";
    import _raids from '../../services/endpoints/raids';
    import SpielerEinladenComp from "../../components/raid/SpielerEinladenComp";

    export default {
        name: "SpielerlistePage",
        components: {SpielerEinladenComp, SpielerComp},
        props: ['raid', 'role', 'user'],
        data: () => ({
            filter: ''
        }),
        methods: {
            isSelf: function(user) {
                return user.id === this.user.id;
            }
        },
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