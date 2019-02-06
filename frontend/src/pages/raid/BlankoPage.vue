<template>
    <div>
        <v-progress-circular
                v-if="!bosses"
                indeterminate
                color="primary"
        ></v-progress-circular>
        <BlankoMenuWingComp
                v-if="bosses"
                v-bind:currentWing="wingFilter"
                v-on:pick="pick">
        </BlankoMenuWingComp>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 xl3
                    v-for="boss in filteredBosses"
                    v-bind:key="boss.id">
                    <BlankoComp
                        v-bind:raid="raid"
                        v-bind:boss="boss"
                        v-bind:elements="elements"
                        v-bind:role="role"
                        v-on:copyBlanko="copyBlanko">
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
    import BlankoMenuWingComp from "../../components/blanko/BlankoMenuWingComp";

    export default {
        name: "BlankoPage",
        components: {BlankoMenuWingComp, BlankoComp},
        props: ['raid', 'role'],
        data: () => ({
            wingFilter: 0,
            elements: null,
        }),
        asyncComputed: {
            bosses: function() {
                return _gamedata.listEncounter();
            }
        },
        computed: {
            filteredBosses: function() {
                if (!this.wingFilter) return this.bosses;
                return this.bosses.filter(b => b.wing === this.wingFilter);
            }
        },
        methods: {
            pick: async function(wing) {
                this.elements = await _blankos.getAllElements(this.raid.id);
                this.wingFilter = wing.id;
            },
            copyBlanko: async function(info) {
                this.elements = await _blankos.copyFromTo(this.raid.id, info[0], info[1]);
            }
        },
        created: async function() {
            this.elements = await _blankos.getAllElements(this.raid.id);
        }
    }
</script>

<style scoped>

</style>