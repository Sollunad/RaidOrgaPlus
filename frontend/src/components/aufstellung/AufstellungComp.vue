<template>
    <div class="aufstellung">
        <AufstellungHeaderComp
            v-bind:aufstellung="aufstellung"
            v-bind:copyActive="copyActive"
            v-on:toggleCopy="toggleCopy">
        </AufstellungHeaderComp>
        <AufstellungBodyComp
                v-if="!copyActive"
                v-bind:aufstellung="aufstellung">
        </AufstellungBodyComp>
        <MenuAufstellungenComp
            v-else
            v-bind:aufstellung="aufstellung"
            v-on:stopCopy="stopCopy"
            class="menu">
        </MenuAufstellungenComp>
    </div>
</template>

<script>
    import AufstellungHeaderComp from "./AufstellungHeaderComp";
    import AufstellungBodyComp from "./AufstellungBodyComp";
    import MenuAufstellungenComp from "./MenuAufstellungenComp";

    export default {
        name: "AufstellungComp",
        components: {MenuAufstellungenComp, AufstellungBodyComp, AufstellungHeaderComp},
        props: ['aufstellung'],
        data: () => ({
            copyActive: false,
        }),
        methods: {
            stopCopy: function() {
                this.copyActive = false;
            },
            toggleCopy: function() {
                this.copyActive = !this.copyActive;
            }
        }
    }
</script>

<style scoped>
    .aufstellung {
        background-color: #222222;
        width: 100%;
        height: 100%;
        box-shadow: 1px 1px 3px black;
    }
</style>