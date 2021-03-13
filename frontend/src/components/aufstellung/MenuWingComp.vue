<template>
    <v-list>
        <v-list-item
                v-for="(wing, index) in wings"
                :key="wing.id"
                @click="null">
            <v-menu>
                <template v-slot:activator="{on}">
                    <v-list-item-title v-on="on">Wing {{ index + 1 }}</v-list-item-title>
                </template>
                <MenuBossComp
                    v-bind:wing="wing"
                    v-bind:showFC="showFC"
                    v-on:pick="pick">
                </MenuBossComp>
            </v-menu>
        </v-list-item>
    </v-list>
</template>

<script lang="ts">
	import Vue from 'vue';
    import MenuBossComp from "./MenuBossComp.vue";
    import _gamedata from '../../services/endpoints/gamedata';

    export default Vue.extend({
        name: "MenuWingComp",
        props: ['showFC'],
        components: {MenuBossComp},
        data: () => ({
            wings: [] as any[],
        }),
        methods: {
            pick: function(info: any): void {
                this.$emit('pick', info);
            }
        },
        created: async function(): Promise<void> {
            this.wings = await _gamedata.listEncounterGrouped();
        }
    })
</script>

<style scoped>

</style>