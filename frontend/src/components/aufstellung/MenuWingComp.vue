<template>
    <v-list>
        <v-list-item
                v-for="(wing, index) in wings"
                :key="wing.id"
                @click="">
            <v-menu>
                <v-list-item-title slot="activator">Wing {{ index + 1 }}</v-list-item-title>
                <MenuBossComp
                    v-bind:wing="wing"
                    v-bind:showFC="showFC"
                    v-on:pick="pick">
                </MenuBossComp>
            </v-menu>
        </v-list-item>
    </v-list>
</template>

<script>
    import MenuBossComp from "./MenuBossComp";
    import _gamedata from '../../services/endpoints/gamedata';

    export default {
        name: "MenuWingComp",
        props: ['showFC'],
        components: {MenuBossComp},
        data: () => ({
            wings: [],
        }),
        methods: {
            pick: function(info) {
                this.$emit('pick',info);
            }
        },
        created: async function() {
            this.wings = await _gamedata.listEncounterGrouped();
        }
    }
</script>

<style scoped>

</style>