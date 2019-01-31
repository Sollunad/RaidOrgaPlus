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
            <NameComp slot="activator" v-bind:user="user" :truncate="true"></NameComp>
            <MenuNameComp
                v-on:pick="pickName"
                v-bind:termin="termin">
            </MenuNameComp>
        </v-menu>
        <NameComp v-else v-bind:user="user" :truncate="true"></NameComp>
    </div>
</template>

<script>
    import _icons from '../../services/icons.js';
    import _aufstellungen from '../../services/endpoints/aufstellungen';
    import MenuClassComp from "./MenuClassComp";
    import MenuRoleComp from "./MenuRoleComp";
    import MenuNameComp from "./MenuNameComp";
    import NameComp from "../menu/NameComp";

    export default {
        name: "AufstellungElementComp",
        components: {NameComp, MenuNameComp, MenuRoleComp, MenuClassComp},
        props: ['aufstellung', 'position', 'propElement', 'raid', 'active', 'locked', 'role', 'termin'],
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
                } else if (this.propElement) {
                    return this.propElement;
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
            user: function() {
                if (this.element) return {
                    name: this.element.name, accname: this.element.accname
                };
                else return {
                    name: '???', accname: '???'
                };
            }
        },
        methods: {
            pickClass: async function(clss) {
                this.classMenuOpen = false;
                this.prepareEditedElement();
                this.editedElement.class = clss.abbr;
                await _aufstellungen.setClass(this.aufstellung.id, this.position, clss.id);
            },
            pickRole: async function(role) {
                this.prepareEditedElement();
                this.editedElement.role = role.abbr;
                await _aufstellungen.setRole(this.aufstellung.id, this.position, role.id);
            },
            pickName: async function(user) {
                this.prepareEditedElement();
                this.editedElement.name = user.name;
                this.editedElement.accname = user.accname;
                await _aufstellungen.setName(this.aufstellung.id, this.position, user.id);
            },
            prepareEditedElement: function() {
                if (!this.element) {
                    this.editedElement = {class: '', role: '', name: '???', accname: '???'};
                } else {
                    this.editedElement = this.element;
                }
            },
        },
        watch: {
            propElement: function() {
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