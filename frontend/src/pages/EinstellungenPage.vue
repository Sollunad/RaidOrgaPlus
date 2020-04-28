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

<script>
    import EinstellungenAPIKeyComp from "../components/einstellungen/EinstellungenAPIKeyComp";
    import EinstellungenEmailComp from "../components/einstellungen/EinstellungenEmailComp";
    import EinstellungenPasswordComp from "../components/einstellungen/EinstellungenPasswordComp";
    import EinstellungenDiscordComp from "../components/einstellungen/EinstellungenDiscordComp";

    export default {
        name: "EinstellungenPage",
        components: {
            EinstellungenDiscordComp,
            EinstellungenPasswordComp, EinstellungenEmailComp, EinstellungenAPIKeyComp},
    }
</script>

<style scoped>
    .profile {
        margin: 5% 10%;
    }
</style>