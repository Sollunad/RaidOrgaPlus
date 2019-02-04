<template>
    <div>
        <v-progress-circular
                v-if="!bosses"
                indeterminate
                color="primary"
        ></v-progress-circular>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 xl3
                    v-for="boss in bosses"
                    v-bind:key="boss.id">
                    <BlankoComp
                        v-bind:raid="raid"
                        v-bind:boss="boss"
                        v-bind:elements="elements">
                    </BlankoComp>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import BlankoComp from "../../components/blanko/BlankoComp";
    import _gamedata from '../../services/endpoints/gamedata';
    import _blankos from '../../services/endpoints/blankos';

    export default {
        name: "BlankoPage",
        components: {BlankoComp},
        props: ['raid'],
        asyncComputed: {
            bosses: function() {
                return _gamedata.listEncounter();
            },
            elements: async function() {
                return _blankos.getAllElements(this.raid.id);
            }
        }
    }
</script>

<style scoped>

</style>