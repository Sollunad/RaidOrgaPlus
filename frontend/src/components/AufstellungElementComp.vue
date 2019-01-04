<template>
    <div v-if="element">
        <v-menu :close-on-content-click="false" v-model="classMenuOpen">
            <v-avatar :size="20" :tile="true" class="avatar" slot="activator">
                <span class="white--text headline" v-if="classIcon === ''">?</span>
                <img :src="classIcon" v-else>
            </v-avatar>
            <MenuClassComp
                v-on:pick="pickClass">
            </MenuClassComp>
        </v-menu>
        <v-avatar :size="20" :tile="true" class="avatar">
            <span class="white--text headline" v-if="roleIcon === ''">?</span>
            <img :src="roleIcon" v-else>
        </v-avatar>
        <span>{{name}}</span>
    </div>
</template>

<script>
    import icons from '../services/icons.js';
    import MenuClassComp from "./MenuClassComp";

    export default {
        name: "AufstellungElementComp",
        components: {MenuClassComp},
        props: ['aufstellungId', 'position', 'elements'],
        data: () => ({
            classMenuOpen: true,
        }),
        computed: {
            element: function() {
                if (this.elements) {
                    return this.elements.filter(e => e.pos === this.position);
                }
            },
            classIcon: function() {
                if (this.element && this.element.length > 0) return icons.classIcon(this.element[0].class);
                else return '';
            },
            roleIcon: function() {
                if (this.element && this.element.length > 0) return icons.roleIcon(this.element[0].role);
                else return '';
            },
            name: function() {
                if (this.element && this.element.length > 0) return this.element[0].spieler;
                else return '???';
            }
        },
        methods: {
            pickClass: function(name) {
                this.classMenuOpen = false;
                console.log(name);
            }
        }
    }
</script>

<style scoped>
    .avatar {
        margin: 0 0.2rem;
    }
</style>