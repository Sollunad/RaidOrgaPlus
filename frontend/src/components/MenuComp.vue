<template>
    <div>
        <v-navigation-drawer
                v-model="drawer"
                clipped
                fixed
                app
        >
            <v-list dense>
                <MenuItemComp
                    v-for="menuItem in menuItems"
                    v-bind:icon="menuItem.icon"
                    v-bind:title="menuItem.title"
                    v-bind:key="menuItem.id"
                ></MenuItemComp>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>RaidOrga+</v-toolbar-title>
        </v-toolbar>
    </div>
</template>

<script>
    import MenuItemComp from './MenuItemComp.vue';

    export default {
        name: "MenuComp",
        data: () => ({
            drawer: null,
            menuItems: [
                { id: 1, icon: 'dashboard', title: 'Dashboard'},
                { id: 2, icon: 'settings', title: 'Settings'}
            ]
        }),
        components: {
            MenuItemComp
        }
    }

</script>

<style scoped>

</style>