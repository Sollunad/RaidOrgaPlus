<template>
    <div class="aufstellung">
        <AufstellungHeaderComp
            v-bind:aufstellungId="aufstellungId"
            v-on:deleteBoss="deleteBoss">
        </AufstellungHeaderComp>
        <AufstellungBodyComp
            v-bind:aufstellungId="aufstellungId"
            v-bind:raid="raid">
        </AufstellungBodyComp>
    </div>
</template>

<script>
    import AufstellungHeaderComp from "./AufstellungHeaderComp";
    import AufstellungBodyComp from "./AufstellungBodyComp";
    export default {
        name: "AufstellungComp",
        components: {AufstellungBodyComp, AufstellungHeaderComp},
        props: ['aufstellungId', 'raid'],
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