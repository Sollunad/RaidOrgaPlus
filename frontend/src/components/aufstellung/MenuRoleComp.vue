<template>
    <div>
        <v-container grid-list-sm class="menu">
            <v-layout row wrap>
                <v-flex
                        v-for="(role, index) in roles"
                        :key="index"
                        xs6>
                    <v-avatar :size="30" class="icon" slot="activator" @click="pick(role)" :tile="true">
                        <img :src="roleIcon(role.abbr)">
                    </v-avatar>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import icons from '../../services/icons';

    export default {
        name: "MenuRoleComp",
        data: () => ({
            roles: [
                { id: 1, abbr: 'P' },
                { id: 2, abbr: 'C' },
                { id: 3, abbr: 'T' },
                { id: 4, abbr: 'H' },
                { id: 5, abbr: 'U' },
            ]
        }),
        methods: {
            roleIcon: function(name) {
                return icons.roleIcon(name);
            },
            pick: function(role) {
                this.$emit('pick', role);
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