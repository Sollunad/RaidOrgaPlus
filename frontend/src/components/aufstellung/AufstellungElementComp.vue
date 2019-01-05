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
        <v-menu>
            <v-avatar :size="20" :tile="true" class="avatar" slot="activator">
                <span class="white--text headline" v-if="roleIcon === ''">?</span>
                <img :src="roleIcon" v-else>
            </v-avatar>
            <MenuRoleComp
                    v-on:pick="pickRole">
            </MenuRoleComp>
        </v-menu>
        <span>{{name}}</span>
    </div>
</template>

<script>
    import icons from '../../services/icons.js';
    import element from '../../services/element';
    import MenuClassComp from "./MenuClassComp";
    import MenuRoleComp from "./MenuRoleComp";

    export default {
        name: "AufstellungElementComp",
        components: {MenuRoleComp, MenuClassComp},
        props: ['aufstellungId', 'position', 'elements'],
        data: () => ({
            classMenuOpen: false,
        }),
        computed: {
            element: function() {
                if (this.elements) {
                    return this.elements.filter(e => e.pos === this.position);
                } else {
                    return null;
                }
            },
            classIcon: function() {
                if (this.element && this.element.length > 0 && this.element[0].class !== '') return icons.classIcon(this.element[0].class);
                else return '';
            },
            roleIcon: function() {
                if (this.element && this.element.length > 0 && this.element[0].role !== '') return icons.roleIcon(this.element[0].role);
                else return '';
            },
            name: function() {
                if (this.element && this.element.length > 0) return this.element[0].spieler;
                else return '???';
            }
        },
        methods: {
            pickClass: async function(id) {
                this.classMenuOpen = false;
                const newElements = await element.setClass(this.aufstellungId, this.position, id);
                this.$emit('update', newElements);
            },
            pickRole: async function(id) {
                const newElements = await element.setRole(this.aufstellungId, this.position, id);
                this.$emit('update', newElements);
            }
        }
    }
</script>

<style scoped>
    .avatar {
        margin: 0 0.2rem;
    }
</style>