<template>
    <v-list>
        <v-list-tile
                v-for="(boss, index) in bosses"
                :key="index"
                @click="pick(boss.id, boss.wing)">
            <v-list-tile-title>{{ boss.name }}</v-list-tile-title>
        </v-list-tile>
    </v-list>
</template>

<script>
    export default {
        name: "MenuBossComp",
        props: ['wing', 'showFC'],
        computed: {
            bosses: function() {
                if (this.showFC) {
                    const fc = [{id:0, name:'Full Clear', wing: this.wing[0].wing}];
                    return fc.concat(this.wing);
                }
                else {
                    return this.wing;
                }
            }
        },
        methods: {
            pick: function(id, wing) {
                console.log(id, wing);
                this.$emit('pick', [id, wing]);
            }
        }
    }
</script>

<style scoped>

</style>