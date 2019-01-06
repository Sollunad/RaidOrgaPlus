<template>
    <div class="aufstellung">
        <AufstellungHeaderComp
            v-bind:aufstellungId="aufstellungId"
            v-on:deleteBoss="deleteBoss"
            v-bind:role="role"
            v-bind:active="active">
        </AufstellungHeaderComp>
        <AufstellungBodyComp
                v-bind:aufstellungId="aufstellungId"
                v-bind:raid="raid"
                v-bind:active="active">
        </AufstellungBodyComp>
    </div>
</template>

<script>
    import AufstellungHeaderComp from "./AufstellungHeaderComp";
    import AufstellungBodyComp from "./AufstellungBodyComp";
    export default {
        name: "AufstellungComp",
        components: {AufstellungBodyComp, AufstellungHeaderComp},
        props: ['aufstellungId', 'raid', 'role', 'active'],
        methods: {
            deleteBoss: function() {
                this.$emit('deleteBoss', this.aufstellungId);
            }
        }
    }
</script>

<style scoped>
    .aufstellung {
        background-color: #222222;
        width: fit-content;
    }
</style>