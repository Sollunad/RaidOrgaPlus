<template>
    <v-list>
        <v-list-tile
                v-for="(boss, index) in bosses"
                :key="index">
            <v-list-tile-title @click="pick(boss.id, wing)">{{ boss.name }}</v-list-tile-title>
        </v-list-tile>
    </v-list>
</template>

<script>
    import _encounter from '../../services/endpoints/gamedata';

    export default {
        name: "MenuBossComp",
        props: ['wing', 'showFC'],
        asyncComputed: {
            bosses: async function() {
                if (this.wing) {
                    const singleBosses = await _encounter.listEncounterForWing(this.wing.id);
                    if (this.showFC) {
                        const fc = [{id:0, name:'Full Clear'}];
                        return fc.concat(singleBosses);
                    }
                    else {
                        return singleBosses;
                    }
                }
                else return [];
            }
        },
        methods: {
            pick: function(id, wing) {
                this.$emit('pick', [id, wing]);
            }
        }
    }
</script>

<style scoped>

</style>