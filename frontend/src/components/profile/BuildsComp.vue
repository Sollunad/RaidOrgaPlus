<template>
    <div class="container">
        <BuildChipComp close
            v-for="build in builds"
            v-bind:clss="build.class"
            v-bind:role="build.role">
        </BuildChipComp>
        <v-dialog width="fit-content"
            v-model="addBuildDialog">
            <v-btn slot="activator" color="green" fab small>
                <v-icon>add</v-icon>
            </v-btn>
            <AddBuildComp
                v-on:add="add"></AddBuildComp>
        </v-dialog>
    </div>
</template>

<script>
    import AddBuildComp from "./AddBuildComp";
    import BuildChipComp from "./BuildChipComp";
    import builds from '../../services/builds';

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
                this.builds = await builds.addBuild(this.user.id, build.clss.id, build.role.id);
            }
        },
        created: async function() {
            this.builds = await builds.getBuilds(10);
            console.log(this.builds);
        }
    }
</script>

<style scoped>
    .container {
        background-color: #444444;
    }
</style>