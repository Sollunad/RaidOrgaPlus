<template>
    <div :class="{'highlighted': isSelfUser, 'doubled': isNameDoubled}">
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
            //element: null,
        }),
        computed: {
            editAllowed: function() {
                return this.$store.getters.isActive && (!this.$store.getters.isLocked || this.$store.getters.raidRole > 0);
            },
            element: function() {
                return this.$store.getters.elementForPosition(this.aufstellung.id, this.position);
            },
            isNameDoubled: function() {
                if (!this.element || !this.element.name || this.element.id <= 1) return false;
                return this.$store.getters.isNameDoubled(this.aufstellung, this.element.name);
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
                await this.$store.dispatch('pickClass', {
                    aufstellung: this.aufstellung.id,
                    position: this.position,
                    clss
                });
                this.loadElementFromStore();
            },
            clearClass: async function() {
                await this.$store.dispatch('clearClass', {
                    aufstellung: this.aufstellung.id,
                    position: this.position,
                });
                this.loadElementFromStore();
            },
            pickRole: async function(role) {
                await this.$store.dispatch('pickRole', {
                    aufstellung: this.aufstellung.id,
                    position: this.position,
                    role
                });
                this.loadElementFromStore();
            },
            clearRole: async function() {
                await this.$store.dispatch('clearRole', {
                    aufstellung: this.aufstellung.id,
                    position: this.position,
                });
                this.loadElementFromStore();
            },
            pickName: async function(user) {
                await this.$store.dispatch('pickName', {
                    aufstellung: this.aufstellung.id,
                    position: this.position,
                    user
                });
                this.loadElementFromStore();
            },
            clearName: async function() {
                await this.$store.dispatch('clearName', {
                    aufstellung: this.aufstellung.id,
                    position: this.position,
                });
                this.loadElementFromStore();
            },
            loadElementFromStore: function() {
                //this.element = this.$store.getters.elementForPosition(this.aufstellung, this.position);
            }
        },
        created: function() {
            this.loadElementFromStore();
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
        background-color: #444;
        border-radius: 10px;
    }

    .doubled {
        border-style: solid;
        border-radius: 10px;
        border-width: 1px;
        border-color: red;
        margin: -1px;
    }
</style>
