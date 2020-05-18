<template>
    <div :class="{'highlighted': isSelfUser}">
        <v-menu :close-on-content-click="false" v-model="classMenuOpen" v-if="editAllowed">
            <template v-slot:activator="{on}">
                <v-avatar :size="20" :tile="true" class="avatar hover" v-on="on" @contextmenu.prevent="clearClass">
                    <img :src="emptyIcon" v-if="classIcon === ''">
                    <img :src="classIcon" v-else>
                </v-avatar>
            </template>
            <MenuClassComp
                v-on:pick="pickClass">
            </MenuClassComp>
        </v-menu>
        <v-avatar :size="20" :tile="true" class="avatar" v-else>
            <img :src="emptyIcon" v-if="classIcon === ''">
            <img :src="classIcon" v-else>
        </v-avatar>
        <v-menu v-if="editAllowed">
            <template v-slot:activator="{on}">
                <v-avatar :size="20" :tile="true" class="avatar hover" v-on="on" @contextmenu.prevent="clearRole">
                    <img :src="emptyIcon" v-if="roleIcon === ''">
                    <img :src="roleIcon" v-else>
                </v-avatar>
            </template>
            <MenuRoleComp
                v-on:pick="pickRole"
                :showStar="true">
            </MenuRoleComp>
        </v-menu>
        <v-avatar :size="20" :tile="true" class="avatar" v-else>
            <img :src="emptyIcon" v-if="roleIcon === ''">
            <img :src="roleIcon" v-else>
        </v-avatar>
        <v-menu v-if="editAllowed" class="namemenu">
            <template v-slot:activator="{on}">
                <span v-on="on" @contextmenu.prevent="clearName" class="hover" :class="{'bold': isSelfUser}">{{user.name}}</span>
            </template>
            <MenuNameComp v-on:pick="pickName"/>
        </v-menu>
        <NameComp v-else v-bind:user="user" :truncate="true" :clickable="true" :class="{'bold': isSelfUser}"></NameComp>
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
        props: ['aufstellung', 'position'],
        data: () => ({
            classMenuOpen: false,
            editedElement: null
        }),
        computed: {
            editAllowed: function() {
                return this.$store.getters.isActive && (!this.$store.getters.isLocked || this.$store.getters.raidRole > 0);
            },
            element: function() {
                if (this.editedElement) {
                    return this.editedElement;
                } else if (this.storeElement) {
                    return this.storeElement;
                } else {
                    return null;
                }
            },
            storeElement: function() {
                return this.$store.getters.elementForPosition(this.aufstellung, this.position);
            },
            classIcon: function() {
                if (this.element && this.element.class !== '') return _icons.classIcon(this.element.class);
                else return '';
            },
            roleIcon: function() {
                if (this.element && this.element.role !== '') return _icons.roleIcon(this.element.role);
                else return '';
            },
            emptyIcon: function() {
                return _icons.miscIcon('empty');
            },
            user: function() {
                if (this.element) return {
                    id: this.element.id, name: this.element.name, accname: this.element.accname
                };
                else return {
                    id: 0, name: '???', accname: '???'
                };
            },
            isSelfUser: function() {
                if (!this.element || !this.$store.getters.loggedInUser) return false;
                const selfAccName = this.$store.getters.loggedInUser.accname;
                return this.element.accname === selfAccName;
            },
        },
        methods: {
            pickClass: async function(clss) {
                this.classMenuOpen = false;
                this.prepareEditedElement();
                this.editedElement.class = clss.abbr;
                await _aufstellungen.setClass(this.aufstellung.id, this.position, clss.id);
                await this.$store.dispatch('wsSendRefresh');
            },
            clearClass: async function() {
                this.prepareEditedElement();
                this.editedElement.class = '';
                await _aufstellungen.setClass(this.aufstellung.id, this.position, 0);
                await this.$store.dispatch('wsSendRefresh');
            },
            pickRole: async function(role) {
                this.prepareEditedElement();
                this.editedElement.role = role.abbr;
                await _aufstellungen.setRole(this.aufstellung.id, this.position, role.id);
                await this.$store.dispatch('wsSendRefresh');
            },
            clearRole: async function() {
                this.prepareEditedElement();
                this.editedElement.role = '';
                await _aufstellungen.setRole(this.aufstellung.id, this.position, 0);
                await this.$store.dispatch('wsSendRefresh');
            },
            pickName: async function(user) {
                this.prepareEditedElement();
                this.editedElement.name = user.name;
                this.editedElement.accname = user.accname;
                await _aufstellungen.setName(this.aufstellung.id, this.position, user.id);
                await this.$store.dispatch('wsSendRefresh');
            },
            clearName: async function() {
                this.prepareEditedElement();
                this.editedElement.name = '???';
                this.editedElement.accname = '???';
                await _aufstellungen.setName(this.aufstellung.id, this.position, 0);
                await this.$store.dispatch('wsSendRefresh');
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
            storeElement: function() {
                this.editedElement = null;
            }
        }
    }
</script>

<style scoped>
    .avatar {
        margin: 0 0.3rem;
    }

    .namemenu {
        margin-left: 0.2rem;
    }

    .hover {
        cursor: pointer;
    }

    .bold {
        font-weight: bold;
    }

    .highlighted {
        background-color: #454431;
        border-radius: 10px;
    }
</style>
