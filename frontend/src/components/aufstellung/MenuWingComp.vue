<template>
    <v-list>
        <v-list-tile
                v-for="(wing, index) in wings"
                :key="index"
        >
            <v-menu>
                <v-list-tile-title slot="activator">Wing {{ wing }}</v-list-tile-title>
                <MenuBossComp></MenuBossComp>
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
            wings: [
                1,2,3,4,5,6
            ]
        })
    }
</script>

<style scoped>

</style>