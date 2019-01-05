<template>
    <v-list>
        <v-list-tile
                v-for="(boss, index) in bosses"
                :key="index"
        >
            <v-list-tile-title @click="pick(boss.id, wing)">{{ boss.name }}</v-list-tile-title>
        </v-list-tile>
    </v-list>
</template>

<script>
    import encounter from '../../services/encounter';

    export default {
        name: "MenuBossComp",
        props: ['wing'],
        asyncComputed: {
            bosses: async function() {
                if (this.wing) {
                    const singleBosses = await encounter.listForWing(this.wing);
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

</style>