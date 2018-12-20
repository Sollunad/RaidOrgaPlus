<template>
    <div>
        <v-navigation-drawer
                v-model="drawer"
                clipped
                fixed
                app
        >
            <v-toolbar flat class="transparent">
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5WHNC1-MDjlPoM7tOuZgb8L_fKr4WC4GtHUxy-4cY5pRnGtoR">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>
                                <NameComp v-bind:user = "user"></NameComp></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-list dense>
                <MenuItemComp
                    v-for="menuItem in menuItems"
                    v-bind:key="menuItem.id"
                    v-bind:menuItem="menuItem"
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
    import NameComp from "./NameComp";

    export default {
        name: "MenuComp",
        data: () => ({
            drawer: null,
            menuItems: [
                { id: 1, icon: 'dashboard', title: 'Dashboard', route: '/dashboard' },
                { id: 2, icon: 'person', title: 'Profil', route: '/profil' },
                { id: 3, icon: 'beenhere', title: 'Skills', route: '/skills'},
                { id: 4, icon: 'settings', title: 'Einstellungen', route: '/einstellungen' },
            ],
            user: { name: 'Daniel', accountname: 'Sollunad.9780'}
        }),
        components: {
            NameComp,
            MenuItemComp
        }
    }

</script>

<style scoped>

</style>