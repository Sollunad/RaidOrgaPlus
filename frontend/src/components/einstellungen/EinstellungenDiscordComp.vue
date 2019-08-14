<template>
    <div>
        <h2>Discord-Account verknüpfen</h2>
        <p></p>
        <v-text-field
                label="Outline"
                single-line
                outline
                v-model="message"
        ></v-text-field>
        <p v-if="key">
            Bot-Befehl in Zwischenablage kopiert! Bitte an den Bot per PN schicken.
        </p>
        <v-btn @click="generateKey">
            Einmalpasswort generieren
        </v-btn>
    </div>
</template>

<script>
    import _users from '../../services/endpoints/users';

    export default {
        name: "EinstellungenDiscordComp",
        props: ['user'],
        data: () => ({
            key: null
        }),
        methods: {
            generateKey: async function() {
                this.key = await _users.getDiscordKey();
                navigator.clipboard.writeText(`!orga login ${this.key}`);
            }
        },
        computed: {
            message: function() {
                if (this.key) return `!orga login ${this.key}`;
                else return `Button clicken, um Einmalpasswort zu generieren`;
            }
        },
    }
</script>

<style scoped>

</style>