<template>
    <v-list>
        <v-list-tile
                v-for="(wing, index) in wings"
                :key="index"
        >
            <v-menu>
                <v-list-tile-title slot="activator">Wing {{ wing }}</v-list-tile-title>
                <MenuBossComp
                    v-bind:wing="wing"
                    v-on:pick="pick">
                </MenuBossComp>
            </v-menu>
        </v-list-tile>
    </v-list>
</template>

<script>
    import MenuBossComp from "./MenuBossComp";
    export default {
        name: "MenuWingComp",
        components: {MenuBossComp},
        data: () => ({
            maxWing: 6
        }),
        computed: {
            wings: function() {
                let ret = [];
                for (let i = 1; i <= this.maxWing; i++) {
                    ret.push(i);
                }
                return ret;
            }
        },
        methods: {
            pick: function(info) {
                this.$emit('pick',info);
            }
        }
    }
</script>

<style scoped>

</style>