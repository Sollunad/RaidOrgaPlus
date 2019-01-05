<template>
    <div class="aufstellung">
        <AufstellungHeaderComp
            v-bind:aufstellungId="aufstellungId">
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
        props: ['aufstellungId', 'raid']
    }
</script>

<style scoped>
    .aufstellung {
        background-color: #222222;
        width: fit-content;
    }
</style>