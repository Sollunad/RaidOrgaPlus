<template>
    <div>
        <h2>Meine Builds</h2>
        <p></p>
        <BuildChipComp close
            v-for="build in builds"
            v-bind:key="`${build.class.id} ${build.role.id}`"
            v-bind:build="build"
            v-bind:star="true"
            v-on:close="close(build)"
            v-on:togglePrefer="togglePrefer(build)">
        </BuildChipComp>
        <v-dialog width="fit-content"
                  v-model="addBuildDialog">
            <v-chip slot="activator">
                <v-icon>add</v-icon>
            </v-chip>
            <AddBuildComp
                    v-on:add="add"></AddBuildComp>
        </v-dialog>
    </div>
</template>

<script>
    import AddBuildComp from "./AddBuildComp";
    import BuildChipComp from "./BuildChipComp";
    import _users from '../../services/endpoints/users';

    export default {
        name: "BuildsComp",
        components: {BuildChipComp, AddBuildComp},
        props: ['user'],
        data: () => ({
            addBuildDialog: false,
            builds : [

            ]
        }),
        methods: {
            add: async function(build) {
                this.addBuildDialog = false;
                this.builds = await _users.addBuild(this.user.id, build.class.id, build.role.id);
            },
            close: function(build) {
                _users.deleteBuild(this.user.id, build.class.id, build.role.id);
            },
            togglePrefer: function(build) {
                let toggled = this.builds.filter(b => b.class.id === build.class.id && b.role.id === build.role.id)[0];
                toggled.prefer = 1 - toggled.prefer;
                _users.putPrefer(this.user.id, build.class.id, build.role.id, toggled.prefer);
            }
        },
        created: async function() {
            this.builds = await _users.getBuilds(this.user.id);
        }
    }
</script>

<style scoped>

</style>