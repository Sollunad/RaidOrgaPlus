<template>
    <div>
        <div class="spinner" v-if="!bosses">
            <v-progress-circular
                    indeterminate
                    color="primary"
            ></v-progress-circular>
        </div>
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

<script lang="ts">
	import Vue from 'vue';
    import BlankoComp from "../../components/blanko/BlankoComp.vue";
    import _gamedata from '../../services/endpoints/gamedata';
    import _blankos from '../../services/endpoints/blankos';
    import BlankoMenuWingComp from "../../components/blanko/BlankoMenuWingComp.vue";

    export default Vue.extend({
        name: "BlankoPage",
        components: {BlankoMenuWingComp, BlankoComp},
        data: () => ({
            wingFilter: 0,
            elements: null,
            bosses: [] as any[]
        }),
        computed: {
            filteredBosses: function(): any[] {
                if (!this.wingFilter) return this.bosses;
                return this.bosses.filter(b => b.wing === this.wingFilter);
            },
            raid: function(): any {
                return this.$store.getters.raid;
            },
            role: function(): any {
                return this.$store.getters.raidRole;
            }
        },
        methods: {
            pick: async function(wing: any): Promise<void> {
                this.wingFilter = wing.id;
            },
            copyBlanko: async function(info: any): Promise<void> {
                this.elements = await _blankos.copyFromTo(this.raid.id, info[0], info[1]);
            }
        },
        created: async function(): Promise<void> {
            this.elements = await _blankos.getAllElements(this.raid.id);
            this.bosses = await _gamedata.listEncounter();
        }
    })
</script>

<style scoped>
    .spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>