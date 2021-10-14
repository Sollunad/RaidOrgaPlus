<template>
    <div>
        <v-container grid-list-sm class="menu">
            <v-layout row wrap>
                <v-flex
                        v-for="(role, index) in roles"
                        :key="index"
                        xs4>
                    <v-avatar :size="30" class="icon" slot="activator" @click="pick(role)" :tile="true">
                        <img :src="roleIcon(role.abbr)">
                    </v-avatar>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _icons from '../../services/icons';

    export default Vue.extend({
        name: "MenuRoleComp",
        props: ['showStar'],
        methods: {
            roleIcon: function(name: string): string {
                return _icons.roleIcon(name);
            },
            pick: function(role: any) {
                this.$emit('pick', role);
            }
        },
        computed: {
            roles: function() {
                const roles = [
                    { id: 1, abbr: 'P' }, // Power
                    { id: 2, abbr: 'C' }, // Condi
                    { id: 4, abbr: 'H' }, // Healer
                    { id: 3, abbr: 'T' }, // Tank
                    { id: 5, abbr: 'U' }, // Utility
                    { id: 6, abbr: 'B' }, // Banner Slave
                    { id: 8, abbr: 'K' }, // Kiter
                ];
                if (this.showStar) {
                    roles.push({ id: 7, abbr: 'S' }); // Special
                }
                return roles;
            }
        }
    })
</script>

<style scoped>
    .menu {
        background-color: var(--v-menuColor-base);
    }

    .icon {
        margin-right: -1rem;
    }
</style>
