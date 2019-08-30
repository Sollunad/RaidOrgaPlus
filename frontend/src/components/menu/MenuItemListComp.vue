<template>
    <v-list dense>
        <v-list-item @click="toHomescreen">
            <v-list-item-avatar
                    v-if="user">
                <v-img :src="icon"/>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>
                    <NameComp
                            v-if="user"
                            v-bind:user = "user"></NameComp>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <MenuItemComp
                v-for="menuItem in menuItems"
                v-bind:key="menuItem.id"
                v-bind:menuItem="menuItem"
        ></MenuItemComp>
        <v-list-item v-if="user.role > 0" to="/moderation">
            <v-list-item-action>
                <v-icon>vpn_key</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Moderation</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item target="_newtab" href="https://docs.google.com/document/d/1oyVaFsCu8_kX4zyU96crqzGix8bMLsPrrjjMtfwpunA/edit?usp=sharing">
            <v-list-item-action>
                <v-icon>help</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Hilfe</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
    import MenuItemComp from './MenuItemComp.vue';
    import NameComp from "./NameComp";
    import _icons from '../../services/icons';

    export default {
        name: "MenuItemListComp",
        props: ['user'],
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
                //{ id: 3, icon: 'beenhere', title: 'Skills', route: '/skills'},
            ]
        }),
        computed: {
            icon: function() {
                if (this.user.discord) {
                    return this.user.discord.avatar;
                } else {
                    return _icons.miscIcon('raid');
                }
            }
        },
        methods: {
            toHomescreen: function() {
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>

</style>