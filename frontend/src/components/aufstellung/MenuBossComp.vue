<template>
    <v-list>
        <v-list-tile
                v-for="(boss, index) in bosses"
                :key="index"
                class="unselectable"
        >
            <v-list-tile-title @click="pick(boss.id, wing)">{{ boss.name }}</v-list-tile-title>
        </v-list-tile>
    </v-list>
</template>

<script>
    import _encounter from '../../services/endpoints/gamedata';

    export default {
        name: "MenuBossComp",
        props: ['wing'],
        asyncComputed: {
            bosses: async function() {
                if (this.wing) {
                    const singleBosses = await _encounter.listEncounterForWing(this.wing);
                    const fc = [{id:0, name:'Full Clear'}];
                    return fc.concat(singleBosses);
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
    .unselectable {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
    }
</style>