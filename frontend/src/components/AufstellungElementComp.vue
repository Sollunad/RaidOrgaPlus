<template>
    <div v-if="element">
        <v-menu :close-on-content-click="false" v-model="classMenuOpen">
            <v-avatar :size="20" :tile="true" class="avatar" slot="activator">
                <img :src="classIcon()">
            </v-avatar>
            <MenuClassComp
                v-on:pick="pickClass">
            </MenuClassComp>
        </v-menu>
        <v-avatar :size="20" :tile="true" class="avatar">
            <img :src="roleIcon()">
        </v-avatar>
        {{element.name}}
    </div>
</template>

<script>
    import icons from '../services/icons.js';
    import MenuClassComp from "./MenuClassComp";

    export default {
        name: "AufstellungElementComp",
        components: {MenuClassComp},
        props: ['aufstellungId', 'position'],
        data: () => ({
            classMenuOpen: true,
            roleMenuDisabled: false,
        }),
        asyncComputed: {
            element: function() {
                return {class: "Hls", role: "P", name: "Daniel"};
            }
        },
        methods: {
            classIcon: function() {
                if (this.element) return icons.classIcon(this.element.class);
                else return '';
            },
            roleIcon: function() {
                if (this.element) return icons.roleIcon(this.element.role);
                else return '';
            },
            pickClass: function(name) {
                this.classMenuOpen = false;
                console.log(name);
            }
        }
    }
</script>

<style scoped>
    .avatar {
        margin: 0 0.1rem;
    }
</style>