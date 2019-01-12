<template>
    <div v-if="element">
        <v-menu :close-on-content-click="false" v-model="classMenuOpen" v-if="active">
            <v-avatar :size="20" :tile="true" class="avatar unselectable" slot="activator">
                <span class="white--text headline" v-if="classIcon === ''">?</span>
                <img :src="classIcon" v-else>
            </v-avatar>
            <MenuClassComp
                v-on:pick="pickClass">
            </MenuClassComp>
        </v-menu>
        <v-avatar :size="20" :tile="true" class="avatar unselectable" v-else>
            <span class="white--text headline" v-if="classIcon === ''">?</span>
            <img :src="classIcon" v-else>
        </v-avatar>
        <v-menu v-if="active">
            <v-avatar :size="20" :tile="true" class="avatar unselectable" slot="activator">
                <span class="white--text headline" v-if="roleIcon === ''">?</span>
                <img :src="roleIcon" v-else>
            </v-avatar>
            <MenuRoleComp
                v-on:pick="pickRole">
            </MenuRoleComp>
        </v-menu>
        <v-avatar :size="20" :tile="true" class="avatar unselectable" v-else>
            <span class="white--text headline" v-if="roleIcon === ''">?</span>
            <img :src="roleIcon" v-else>
        </v-avatar>
        <v-menu :lazy="true" v-if="active">
            <span slot="activator" class="unselectable">{{name}}</span>
            <MenuNameComp
                v-on:pick="pickName"
                v-bind:raid="raid">
            </MenuNameComp>
        </v-menu>
        <span v-else class="unselectable">{{name}}</span>
    </div>
</template>

<script>
    import icons from '../../services/icons.js';
    import element from '../../services/element';
    import MenuClassComp from "./MenuClassComp";
    import MenuRoleComp from "./MenuRoleComp";
    import MenuNameComp from "./MenuNameComp";

    export default {
        name: "AufstellungElementComp",
        components: {MenuNameComp, MenuRoleComp, MenuClassComp},
        props: ['aufstellung', 'position', 'elements', 'raid', 'active'],
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
                const newElements = await element.setClass(this.aufstellung.id, this.position, id);
                this.$emit('update', newElements);
            },
            pickRole: async function(id) {
                const newElements = await element.setRole(this.aufstellung.id, this.position, id);
                this.$emit('update', newElements);
            },
            pickName: async function(id) {
                const newElements = await element.setName(this.aufstellung.id, this.position, id);
                this.$emit('update', newElements);
            }
        }
    }
</script>

<style scoped>
    .avatar {
        margin: 0 0.2rem;
    }

    .unselectable {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
    }
</style>