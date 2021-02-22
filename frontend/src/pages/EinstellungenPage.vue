<template>
    <div class="profile">
        <EinstellungenDiscordComp/>
        <p></p>
        <v-divider></v-divider>
        <p></p>
        <EinstellungenAPIKeyComp/>
        <p></p>
        <v-divider></v-divider>
        <p></p>
        <EinstellungenEmailComp/>
        <p></p>
        <v-divider></v-divider>
        <p></p>
        <EinstellungenPasswordComp/>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import EinstellungenAPIKeyComp from "../components/einstellungen/EinstellungenAPIKeyComp.vue";
    import EinstellungenEmailComp from "../components/einstellungen/EinstellungenEmailComp.vue";
    import EinstellungenPasswordComp from "../components/einstellungen/EinstellungenPasswordComp.vue";
    import EinstellungenDiscordComp from "../components/einstellungen/EinstellungenDiscordComp.vue";

    export default Vue.extend({
        name: "EinstellungenPage",
        components: {
            EinstellungenDiscordComp,
            EinstellungenPasswordComp, EinstellungenEmailComp, EinstellungenAPIKeyComp},
    })
</script>

<style scoped>
    .profile {
        margin: 5% 10%;
    }
</style>