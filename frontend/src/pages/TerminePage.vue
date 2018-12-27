<template>
    <div>
        <TerminOverviewComp
                v-bind:raid="raid"
                v-bind:archived="false"
                v-on:saveTerminId="saveTerminId">
        </TerminOverviewComp>
        <v-btn color="success" class="buttonAdd"
               v-if="role > 0">
            Neuer Termin
        </v-btn>
    </div>
</template>

<script>
    import TerminOverviewComp from "../components/TerminOverviewComp";

    export default {
        name: "TerminePage",
        components: {TerminOverviewComp},
        props: ['raid', 'role'],
        methods: {
            saveTerminId: function(id) {
                this.$emit('saveTerminId', id);
            }
        }
    }
</script>

<style scoped>
    .buttonAdd {
        margin-top: 1rem;
    }
</style>