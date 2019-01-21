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
                if (!this.buildExists(build)) {
                    build.prefer = 0;
                    this.builds.push(build);
                    this.builds.sort(this.compareBuilds);
                    _users.addBuild(build.class.id, build.role.id);
                }
            },
            close: function(build) {
                _users.deleteBuild(build.class.id, build.role.id);
            },
            togglePrefer: function(build) {
                build.prefer = 1 - build.prefer;
                _users.putPrefer(build.class.id, build.role.id, build.prefer);
            },
            compareBuilds: function(buildA, buildB) {
                if (this.baseId(buildA) === this.baseId(buildB)) {
                    if (buildA.class.id === buildB.class.id) {
                        if (buildA.role.id === buildB.role.id) {
                            return 0;
                        } else {
                            return buildA.role.id < buildB.role.id? -1: 1;
                        }
                    } else {
                        return buildA.class.id < buildB.class.id? -1: 1;
                    }
                } else {
                    return this.baseId(buildA) < this.baseId(buildB)? -1 : 1;
                }
            },
            baseId: function(build) {
                return (build.class.id - 1) % 9 + 1;
            },
            buildExists: function(build) {
                let search = this.builds.filter(b => b.class.id === build.class.id && b.role.id === build.role.id);
                return search.length > 0;
            }
        },
        created: async function() {
            this.builds = await _users.getBuilds(this.user.id);
        }
    }
</script>

<style scoped>

</style>