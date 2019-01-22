<template>
    <div>
        <v-menu :close-on-content-click="false" v-model="classMenuOpen" v-if="editAllowed">
            <v-avatar :size="20" :tile="true" class="avatar" slot="activator">
                <span class="white--text headline" v-if="classIcon === ''">?</span>
                <img :src="classIcon" v-else>
            </v-avatar>
            <MenuClassComp
                v-on:pick="pickClass">
            </MenuClassComp>
        </v-menu>
        <v-avatar :size="20" :tile="true" class="avatar" v-else>
            <span class="white--text headline" v-if="classIcon === ''">?</span>
            <img :src="classIcon" v-else>
        </v-avatar>
        <v-menu v-if="editAllowed">
            <v-avatar :size="20" :tile="true" class="avatar" slot="activator">
                <span class="white--text headline" v-if="roleIcon === ''">?</span>
                <img :src="roleIcon" v-else>
            </v-avatar>
            <MenuRoleComp
                v-on:pick="pickRole">
            </MenuRoleComp>
        </v-menu>
        <v-avatar :size="20" :tile="true" class="avatar" v-else>
            <span class="white--text headline" v-if="roleIcon === ''">?</span>
            <img :src="roleIcon" v-else>
        </v-avatar>
        <v-menu :lazy="true" v-if="editAllowed">
            <span slot="activator">{{name}}</span>
            <MenuNameComp
                v-on:pick="pickName"
                v-bind:raid="raid">
            </MenuNameComp>
        </v-menu>
        <span v-else>{{name}}</span>
    </div>
</template>

<script>
    import _icons from '../../services/icons.js';
    import _aufstellungen from '../../services/endpoints/aufstellungen';
    import MenuClassComp from "./MenuClassComp";
    import MenuRoleComp from "./MenuRoleComp";
    import MenuNameComp from "./MenuNameComp";

    export default {
        name: "AufstellungElementComp",
        components: {MenuNameComp, MenuRoleComp, MenuClassComp},
        props: ['aufstellung', 'position', 'elements', 'raid', 'active', 'locked', 'role'],
        data: () => ({
            classMenuOpen: false,
            editedElement: null
        }),
        computed: {
            editAllowed: function() {
                return this.active && (!this.locked || this.role > 0);
            },
            element: function() {
                if (this.editedElement) {
                    return this.editedElement;
                } else if (this.elements) {
                    return this.elements.filter(e => e.pos === this.position)[0];
                } else {
                    return null;
                }
            },
            classIcon: function() {
                if (this.element && this.element.class !== '') return _icons.classIcon(this.element.class);
                else return '';
            },
            roleIcon: function() {
                if (this.element && this.element.role !== '') return _icons.roleIcon(this.element.role);
                else return '';
            },
            name: function() {
                if (this.element) return this.element.spieler;
                else return '???';
            }
        },
        methods: {
            pickClass: async function(clss) {
                this.classMenuOpen = false;
                this.prepareEditedElement();
                this.editedElement.class = clss.abbr;
                _aufstellungen.setClass(this.aufstellung.id, this.position, clss.id);
            },
            pickRole: async function(role) {
                this.prepareEditedElement();
                this.editedElement.role = role.abbr;
                _aufstellungen.setRole(this.aufstellung.id, this.position, role.id);
            },
            pickName: async function(user) {
                this.prepareEditedElement();
                this.editedElement.spieler = user.name;
                _aufstellungen.setName(this.aufstellung.id, this.position, user.id);
            },
            prepareEditedElement: function() {
                if (!this.element) {
                    this.editedElement = {class: '', role: '', spieler: '???'};
                } else {
                    this.editedElement = this.element;
                }
            },
        },
        watch: {
            elements: function() {
                this.editedElement = null;
            }
        }
    }
</script>

<style scoped>
    .avatar {
        margin: 0 0.2rem;
    }
</style>