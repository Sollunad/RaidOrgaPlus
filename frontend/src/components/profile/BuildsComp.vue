<template>
    <div>
        <BuildChipComp close></BuildChipComp>
        <v-dialog width="fit-content">
            <v-btn slot="activator" color="green" fab small>
                <v-icon>add</v-icon>
            </v-btn>
            <AddBuildComp></AddBuildComp>
        </v-dialog>
    </div>
</template>

<script>
    import AddBuildComp from "./AddBuildComp";
    import BuildChipComp from "./BuildChipComp";
    export default {
        name: "BuildsComp",
        components: {BuildChipComp, AddBuildComp},
        props: ['user']
    }
</script>

<style scoped>

</style>