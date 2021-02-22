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

<script lang="ts">
	import Vue from 'vue';
    import AufstellungHeaderComp from "./AufstellungHeaderComp.vue";
    import AufstellungBodyComp from "./AufstellungBodyComp.vue";
    import MenuAufstellungenComp from "./MenuAufstellungenComp.vue";

    export default Vue.extend({
        name: "AufstellungComp",
        components: {MenuAufstellungenComp, AufstellungBodyComp, AufstellungHeaderComp},
        props: ['aufstellung'],
        data: () => ({
            copyActive: false,
        }),
        methods: {
            stopCopy: function(): void {
                this.copyActive = false;
            },
            toggleCopy: function(): void {
                this.copyActive = !this.copyActive;
            }
        }
    })
</script>

<style scoped>
    .aufstellung {
        background-color: #222222;
        width: 100%;
        height: 100%;
        box-shadow: 1px 1px 3px black;
    }
</style>