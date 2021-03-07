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

<script lang="ts">
	import Vue, { PropType } from 'vue';
    import _icons from '../../services/icons';
    import _aufstellungen from '../../services/endpoints/aufstellungen';
    import MenuClassComp from "./MenuClassComp.vue";
    import MenuRoleComp from "./MenuRoleComp.vue";
    import MenuNameComp from "./MenuNameComp.vue";
    import NameComp from "../menu/NameComp.vue";
import { MyActions } from '@/models/Store/State';

    export default Vue.extend({
        name: "AufstellungElementComp",
        components: {NameComp, MenuNameComp, MenuRoleComp, MenuClassComp},
		props: {
			aufstellung: Object as PropType<any>,
			position: Number
		},
        data: () => ({
            classMenuOpen: false,
            //element: null,
        }),
        computed: {
            editAllowed: function(): boolean {
                return this.$vStore.getters.isActive && (!this.$vStore.getters.isLocked || this.$vStore.getters.raidRole > 0);
            },
            element: function(): any {
                return this.$vStore.getters.elementForPosition(this.aufstellung.id, this.position);
            },
            isNameDoubled: function(): any {
                if (!this.element || !this.element.name || this.element.id <= 1) return false;
                return this.$vStore.getters.isNameDoubled(this.aufstellung, this.element.name);
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
            user: function(): any {
                if (this.element) return {
                    id: this.element.id, name: this.element.name, accname: this.element.accname
                };
                else return {
                    id: 0, name: '???', accname: '???'
                };
            },
            isSelfUser: function(): boolean {
                if (!this.element || !this.$vStore.getters.loggedInUser) return false;
                const selfAccName = this.$vStore.getters.loggedInUser.accname;
                return this.element.accname === selfAccName;
            },
        },
        methods: {
            pickClass: async function(clss: any) {
                this.classMenuOpen = false;
                await this.$vStore.dispatch(MyActions.PickClass, {
                    aufstellung: this.aufstellung.id,
                    position: this.position,
                    clss
                });
                this.loadElementFromStore();
            },
            clearClass: async function() {
                await this.$vStore.dispatch(MyActions.ClearClass, {
                    aufstellung: this.aufstellung.id,
                    position: this.position,
                });
                this.loadElementFromStore();
            },
            pickRole: async function(role: any) {
                await this.$vStore.dispatch(MyActions.PickRole, {
                    aufstellung: this.aufstellung.id,
                    position: this.position,
                    role
                });
                this.loadElementFromStore();
            },
            clearRole: async function() {
                await this.$vStore.dispatch(MyActions.ClearRole, {
                    aufstellung: this.aufstellung.id,
                    position: this.position,
                });
                this.loadElementFromStore();
            },
            pickName: async function(user: any) {
                await this.$vStore.dispatch(MyActions.PickName, {
                    aufstellung: this.aufstellung.id,
                    position: this.position,
                    user
                });
                this.loadElementFromStore();
            },
            clearName: async function() {
                await this.$vStore.dispatch(MyActions.ClearName, {
                    aufstellung: this.aufstellung.id,
                    position: this.position,
                });
                this.loadElementFromStore();
            },
            loadElementFromStore: function() {
                //this.element = this.$vStore.getters.elementForPosition(this.aufstellung, this.position);
            }
        },
        created: function() {
            this.loadElementFromStore();
        }
    })
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
