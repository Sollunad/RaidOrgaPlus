<template>
    <v-list>
        <v-list-tile
                v-for="wing in wings"
                :key="wing.id"
                @click="">
            <v-menu>
                <v-list-tile-title slot="activator">Wing {{ wing.id }}</v-list-tile-title>
                <MenuBossComp
                    v-bind:wing="wing"
                    v-bind:showFC="showFC"
                    v-on:pick="pick">
                </MenuBossComp>
            </v-menu>
        </v-list-tile>
    </v-list>
</template>

<script>
    import MenuBossComp from "./MenuBossComp";
    import _gamedata from '../../services/endpoints/gamedata';

    export default {
        name: "MenuWingComp",
        props: ['showFC'],
        components: {MenuBossComp},
        asyncComputed: {
            wings: function() {
                return _gamedata.getWings();
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