<template>
    <div>
        <v-menu :close-on-content-click="false" v-model="classMenuOpen" v-if="role > 0">
            <template v-slot:activator="{on}">
                <v-avatar :size="20" :tile="true" class="avatar" v-on="on" @contextmenu.prevent="clearClass">
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
        <v-menu v-if="role > 0">
            <template v-slot:activator="{on}">
                <v-avatar :size="20" :tile="true" class="avatar" v-on="on" @contextmenu.prevent="clearRole">
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
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _icons from '../../services/icons';
    import _blankos from '../../services/endpoints/blankos';
    import MenuClassComp from "../aufstellung/MenuClassComp.vue";
    import MenuRoleComp from "../aufstellung/MenuRoleComp.vue";

    export default Vue.extend({
        name: "BlankoElementComp",
        components: {MenuRoleComp, MenuClassComp},
        props: ['raid', 'boss', 'position', 'propElement', 'role'],
        data: () => ({
            classMenuOpen: false,
            editedElement: null as any
        }),
        computed: {
            element: function(): any {
                if (this.editedElement) {
                    return this.editedElement;
                } else if (this.propElement) {
                    return this.propElement;
                } else {
                    return null;
                }
            },
            classIcon: function(): string {
                if (this.element && this.element.class !== '') return _icons.classIcon(this.element.class);
                else return '';
            },
            roleIcon: function(): string {
                if (this.element && this.element.role !== '') return _icons.roleIcon(this.element.role);
                else return '';
            },
            emptyIcon: function(): string {
                return _icons.miscIcon('empty');
            },
        },
        methods: {
            pickClass: async function(clss: any): Promise<void> {
                this.classMenuOpen = false;
                this.prepareEditedElement();
                this.editedElement.class = clss.abbr;
                await _blankos.setClass(this.raid.id, this.boss.id, this.position, clss.id);
            },
            clearClass: async function(): Promise<void> {
                this.prepareEditedElement();
                this.editedElement.class = '';
                await _blankos.setClass(this.raid.id, this.boss.id, this.position, 0);
            },
            pickRole: async function(role: any): Promise<void> {
                this.prepareEditedElement();
                this.editedElement.role = role.abbr;
                await _blankos.setRole(this.raid.id, this.boss.id, this.position, role.id);
            },
            clearRole: async function(): Promise<void> {
                this.prepareEditedElement();
                this.editedElement.role = '';
                await _blankos.setRole(this.raid.id, this.boss.id, this.position, 0);
            },
            prepareEditedElement: function(): void {
                if (!this.element) {
                    this.editedElement = {class: '', role: ''};
                } else {
                    this.editedElement = this.element;
                }
            },
        },
        watch: {
            propElement: function(): void {
                this.editedElement = null;
            }
        }
    })
</script>

<style scoped>
    .avatar {
        margin: 0 0.2rem;
    }
</style>
