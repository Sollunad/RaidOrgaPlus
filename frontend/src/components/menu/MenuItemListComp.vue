<template>
    <v-list dense>
        <v-list-item @click="toHomescreen">
            <v-list-item-avatar>
                <v-img :src="icon"/>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>
                    <NameComp :user = "user"></NameComp>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <MenuItemComp
                v-for="menuItem in menuItems"
                v-bind:key="menuItem.id"
                v-bind:menuItem="menuItem"
        ></MenuItemComp>
        <v-list-item v-if="user.role > 1" to="/moderation">
            <v-list-item-action>
                <v-icon>vpn_key</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Moderation</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script lang="ts">
	import Vue from 'vue';
    import MenuItemComp from './MenuItemComp.vue';
    import NameComp from "./NameComp.vue";
    import _icons from '../../services/icons';

    export default Vue.extend({
        name: "MenuItemListComp",
        components: {
            NameComp,
            MenuItemComp
        },
        data: () => ({
            menuItems: [
                { id: 0, icon: 'home', title: 'Home', route: '/' },
                { id: 1, icon: 'explore', title: 'Meine Raids', route: '/raids' },
                { id: 2, icon: 'account_circle', title: 'Profil', route: '/profil' },
                { id: 3, icon: 'settings', title: 'Einstellungen', route: '/einstellungen' },
                { id: 4, icon: 'help', title: 'Hilfe', route: '/help' },
                //{ id: 3, icon: 'beenhere', title: 'Skills', route: '/skills'},
            ]
        }),
        computed: {
            icon: function(): string {
                if (this.user.discord) {
                    return this.user.discord.avatar;
                } else {
                    return _icons.miscIcon('raid');
                }
            },
            user: function(): any {
                return this.$vStore.getters.loggedInUser;
            }
        },
        methods: {
            toHomescreen: function(): void {
                this.$router.push('/');
            },
        }
    })
</script>

<style scoped>

</style>