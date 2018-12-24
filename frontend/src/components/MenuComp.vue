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
                        <v-list-tile-avatar
                            v-if="user">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5WHNC1-MDjlPoM7tOuZgb8L_fKr4WC4GtHUxy-4cY5pRnGtoR">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>
                                <NameComp
                                        v-if="user"
                                        v-bind:user = "user"></NameComp></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-list dense
                    v-if="loggedIn"
            >
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
            <v-spacer></v-spacer>
            <v-btn icon
                   v-if="user"
                   @click="logout">
                <v-icon>logout</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
</template>

<script>
    import MenuItemComp from './MenuItemComp.vue';
    import NameComp from "./NameComp";
    import user from '../services/user.js';
    import session from '../services/session.js';

    export default {
        name: "MenuComp",
        data: () => ({
            drawer: null,
            menuItems: [
                { id: 1, icon: 'casino', title: 'Meine Raids', route: '/raids' },
                { id: 2, icon: 'person', title: 'Profil', route: '/profil' },
                { id: 3, icon: 'beenhere', title: 'Skills', route: '/skills'},
                { id: 4, icon: 'settings', title: 'Einstellungen', route: '/einstellungen' },
            ]
        }),
        props: ['userId'],
        components: {
            NameComp,
            MenuItemComp
        },
        computed: {
            loggedIn: function() {
                return this.userId !== 0;
            }
        },
        asyncComputed: {
            user: function() {
                if (this.userId) return user.get(this.userId);
            }
        },
        methods: {
            logout: function() {
                session.invalidate(localStorage.session);
                localStorage.session = "";
                window.location.reload();
            }
        }
    }

</script>

<style scoped>

</style>