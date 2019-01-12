<template>
    <div>
        <BuildChipComp close></BuildChipComp>
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
    export default {
        name: "BuildsComp",
        components: {BuildChipComp, AddBuildComp},
        props: ['user'],
        data: () => ({
            addBuildDialog: false
        }),
        methods: {
            add: function(build) {
                this.addBuildDialog = false;
            }
        }
    }
</script>

<style scoped>

</style>