<template>
    <v-list dense>
        <MenuItemComp
                v-for="menuItem in menuItems"
                v-bind:key="menuItem.id"
                v-bind:menuItem="menuItem"
        ></MenuItemComp>
        <v-list-tile target="_newtab" href="https://docs.google.com/document/d/1oyVaFsCu8_kX4zyU96crqzGix8bMLsPrrjjMtfwpunA/edit?usp=sharing">
            <v-list-tile-action>
                <v-icon>help</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Hilfe</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script>
    import MenuItemComp from './MenuItemComp.vue';

    export default {
        name: "MenuItemListComp",
        components: {
            MenuItemComp
        },
        data: () => ({
            menuItems: [
                { id: 0, icon: 'fa-home', title: 'Home', route: '/' },
                { id: 1, icon: 'fa-dungeon', title: 'Meine Raids', route: '/raids' },
                { id: 2, icon: 'fa-user-circle', title: 'Profil', route: '/profil' },
                //{ id: 3, icon: 'beenhere', title: 'Skills', route: '/skills'},
            ]
        })
    }
</script>

<style scoped>

</style>