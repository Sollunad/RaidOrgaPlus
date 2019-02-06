<template>
    <div>
        <v-menu :close-on-content-click="false" v-model="classMenuOpen" :lazy="true" v-if="role > 0">
            <v-avatar :size="20" :tile="true" class="avatar" slot="activator" @contextmenu.prevent="clearClass">
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
        <v-menu :lazy="true" v-if="role > 0">
            <v-avatar :size="20" :tile="true" class="avatar" slot="activator" @contextmenu.prevent="clearRole">
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
    </div>
</template>

<script>
    import _icons from '../../services/icons.js';
    import _blankos from '../../services/endpoints/blankos';
    import MenuClassComp from "../aufstellung/MenuClassComp";
    import MenuRoleComp from "../aufstellung/MenuRoleComp";

    export default {
        name: "BlankoElementComp",
        components: {MenuRoleComp, MenuClassComp},
        props: ['raid', 'boss', 'position', 'propElement', 'role'],
        data: () => ({
            classMenuOpen: false,
            editedElement: null
        }),
        computed: {
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
            }
        },
        methods: {
            pickClass: async function(clss) {
                this.classMenuOpen = false;
                this.prepareEditedElement();
                this.editedElement.class = clss.abbr;
                await _blankos.setClass(this.raid.id, this.boss.id, this.position, clss.id);
            },
            clearClass: async function() {
                this.prepareEditedElement();
                this.editedElement.class = '';
                await _blankos.setClass(this.raid.id, this.boss.id, this.position, 0);
            },
            pickRole: async function(role) {
                this.prepareEditedElement();
                this.editedElement.role = role.abbr;
                await _blankos.setRole(this.raid.id, this.boss.id, this.position, role.id);
            },
            clearRole: async function() {
                this.prepareEditedElement();
                this.editedElement.role = '';
                await _blankos.setRole(this.raid.id, this.boss.id, this.position, 0);
            },
            prepareEditedElement: function() {
                if (!this.element) {
                    this.editedElement = {class: '', role: ''};
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