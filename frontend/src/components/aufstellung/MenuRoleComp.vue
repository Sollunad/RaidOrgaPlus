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

<script>
    import _icons from '../../services/icons';

    export default {
        name: "MenuRoleComp",
        props: ['showStar'],
        methods: {
            roleIcon: function(name) {
                return _icons.roleIcon(name);
            },
            pick: function(role) {
                this.$emit('pick', role);
            }
        },
        computed: {
            roles: function() {
                const roles = [
                    { id: 1, abbr: 'P' },
                    { id: 2, abbr: 'C' },
                    { id: 4, abbr: 'H' },
                    { id: 3, abbr: 'T' },
                    { id: 5, abbr: 'U' },
                    { id: 6, abbr: 'B' },
                    { id: 8, abbr: 'K' },
                ];
                if (this.showStar) {
                    roles.push({ id: 7, abbr: 'S' });
                }
                return roles;
            }
        }
    }
</script>

<style scoped>
    .menu {
        background-color: #444444;
    }

    .icon {
        margin-right: -1rem;
    }
</style>
