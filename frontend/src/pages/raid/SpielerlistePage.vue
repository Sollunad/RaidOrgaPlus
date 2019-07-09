<template>
    <div>
        <SpielerEinladenComp
            v-if="role > 0"
            v-bind:raid="raid">
        </SpielerEinladenComp>
        <BuildFilterButtonsComp
                v-on:setFilter="setFilter">
        </BuildFilterButtonsComp>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex
                        v-for="listuser in users"
                        :key="listuser.id"
                        xs12 sm6 lg4 xl3>
                    <SpielerComp
                            v-bind:user="listuser"
                            v-bind:role="role"
                            v-bind:filter="filter"
                            v-on:kick="kick">
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
    import BuildFilterButtonsComp from "../../components/raid/BuildFilterButtonsComp";

    export default {
        name: "SpielerlistePage",
        components: {BuildFilterButtonsComp, SpielerEinladenComp, SpielerComp},
        props: ['raid', 'role'],
        data: () => ({
            filter: '',
            users: [],
        }),
        methods: {
            kick: async function(user) {
                this.users = await _raids.kickPlayer(this.raid.id, user.id);
            },
            setFilter: function(filter) {
                this.filter = filter;
            }
        },
        created: async function() {
            if (this.raid) {
                this.users = await _raids.listPlayers(this.raid.id);
            }
        }
    }
</script>

<style scoped>

</style>