<template>
    <div class="profile">
        <EinstellungenDiscordComp
            v-bind:user="user">
        </EinstellungenDiscordComp>
        <p></p>
        <v-divider></v-divider>
        <p></p>
        <EinstellungenAPIKeyComp
            v-bind:user="user">
        </EinstellungenAPIKeyComp>
        <p></p>
        <v-divider></v-divider>
        <p></p>
        <EinstellungenEmailComp
            v-bind:user="user">
        </EinstellungenEmailComp>
        <p></p>
        <v-divider></v-divider>
        <p></p>
        <EinstellungenPasswordComp
            v-bind:user="user">
        </EinstellungenPasswordComp>
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
        props: ['user'],
        data: () => ({
            buildDialog: false
        }),
        methods: {
            changeName: function(name) {
                this.$emit('changeName', name);
            }
        }
    }
</script>

<style scoped>
    .profile {
        margin: 5% 10%;
    }
</style>