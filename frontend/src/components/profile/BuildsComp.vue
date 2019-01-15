<template>
    <div>
        <h2>Meine Builds</h2>
        <p></p>
        <v-dialog width="fit-content"
                  v-model="addBuildDialog">
            <v-chip slot="activator">
                <v-icon>add</v-icon>
            </v-chip>
            <AddBuildComp
                    v-on:add="add"></AddBuildComp>
        </v-dialog>
        <BuildChipComp close
            v-for="build in builds"
            v-bind:key="`${build.class.id} ${build.role.id}`"
            v-bind:clss="build.class"
            v-bind:role="build.role"
            v-on:close="close">
        </BuildChipComp>
    </div>
</template>

<script>
    import AddBuildComp from "./AddBuildComp";
    import BuildChipComp from "./BuildChipComp";
    import users from '../../services/endpoints/users';

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
                this.builds = await users.addBuild(this.user.id, build.clss.id, build.role.id);
            },
            close: function(build) {
                users.deleteBuild(this.user.id, build.clss.id, build.role.id);
            }
        },
        created: async function() {
            this.builds = await users.getBuilds(10);
        }
    }
</script>

<style scoped>

</style>