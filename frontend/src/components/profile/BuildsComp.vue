<template>
    <div>
        <div class="headline">
            Meine Builds
        </div>
        <p></p>
        <v-progress-circular
                v-if="loading"
                indeterminate
                color="primary"
        ></v-progress-circular>
        <BuildChipComp :close="ownProfile"
            v-for="build in builds"
            v-bind:key="`${build.class.id} ${build.role.id}`"
            v-bind:build="build"
            v-bind:star="true"
            v-bind:ownProfile="ownProfile"
            v-on:close="close(build)"
            v-on:togglePrefer="togglePrefer(build)">
        </BuildChipComp>
        <v-dialog
            width="unset"
            v-model="addBuildDialog"
            v-if="!loading && ownProfile">
            <template v-slot:activator="{on}">
                <v-chip v-on="on" class="addChip">
                    <v-icon>add</v-icon>
                </v-chip>
            </template>
            <AddBuildComp
                    v-on:add="add"></AddBuildComp>
        </v-dialog>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import AddBuildComp from "./AddBuildComp.vue";
    import BuildChipComp from "./BuildChipComp.vue";
    import _users from '../../services/endpoints/users';

    export default Vue.extend({
        name: "BuildsComp",
        components: {BuildChipComp, AddBuildComp},
        props: ['user', 'ownProfile'],
        data: () => ({
            addBuildDialog: false,
            builds : [] as any[],
            loading: true,
        }),
        methods: {
            add: async function(build: any): Promise<void> {
                this.addBuildDialog = false;
                if (!this.buildExists(build)) {
                    build.prefer = 0;
                    this.builds.push(build);
                    this.builds.sort(this.compareBuilds);
                    _users.addBuild(build.class.id, build.role.id);
                }
            },
            close: async function(build: any): Promise<void> {
                await _users.deleteBuild(build.class.id, build.role.id);
                this.builds = this.builds.filter(b => b.class.id !== build.class.id || b.role.id !== build.role.id);
            },
            togglePrefer: async function(build: any): Promise<void> {
                build.prefer = 1 - build.prefer;
                this.builds.sort(this.compareBuilds);
                await _users.putPrefer(build.class.id, build.role.id, build.prefer);
            },
            compareBuilds: function(buildA: any, buildB: any): number {
                if (buildA.prefer === buildB.prefer) {
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
                } else {
                    return buildA.prefer > buildB.prefer? -1 : 1;
                }
            },
            baseId: function(build: any): number {
                return (build.class.id - 1) % 9 + 1;
            },
            buildExists: function(build: any): boolean {
                let search = this.builds.filter(b => b.class.id === build.class.id && b.role.id === build.role.id);
                return search.length > 0;
            }
        },
        created: async function(): Promise<void> {
            this.builds = await _users.getBuilds(this.user.id);
            this.loading = false;
        }
    })
</script>

<style scoped>
    .addChip {
        margin: 5px;
    }
</style>
