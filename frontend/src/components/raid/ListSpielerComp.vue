<template>
    <v-list-tile>
        <v-container>
            <v-layout row>
                <v-flex xs2 class="name">
                    <NameComp
                        v-bind:user="user">
                    </NameComp>
                </v-flex>
                <v-flex xs10 class="builds">
                    <BuildChipComp
                            v-for="build in builds"
                            v-bind:key="`${build.class.id} ${build.role.id}`"
                            v-bind:clss="build.class"
                            v-bind:role="build.role">
                    </BuildChipComp>
                </v-flex>
            </v-layout>
        </v-container>
    </v-list-tile>
</template>

<script>
    import _users from '../../services/endpoints/users';
    import BuildChipComp from "../profile/BuildChipComp";
    import NameComp from "../menu/NameComp";

    export default {
        name: "ListSpielerComp",
        components: {NameComp, BuildChipComp},
        props: ['user'],
        asyncComputed: {
            builds: function() {
                if (this.user) return _users.getBuilds(this.user.id);
            }
        }
    }
</script>

<style scoped>
    .name {
        margin-top: -8px;
    }

    .builds {
        margin-top: -20px;
    }
</style>