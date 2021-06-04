<template>
    <div>
        <h2>Discord-Account verknüpfen</h2>
        <p></p>
        <v-text-field
                single-line
                outline
                label="Button klicken, um Einmalpasswort zu generieren"
                v-model="message"
        ></v-text-field>
        <p v-if="key">
            Bot-Befehl in Zwischenablage kopiert! Bitte an den RaidOrga+ Bot per PN schicken.
        </p>
        <v-btn @click="generateKey">
            Einmalpasswort generieren
        </v-btn>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _users from '../../services/endpoints/users';

    export default Vue.extend({
        name: "EinstellungenDiscordComp",
        data: () => ({
            key: null
        }),
        methods: {
            generateKey: async function(): Promise<void> {
                this.key = await _users.getDiscordKey();
                await navigator.clipboard.writeText(`!orga login ${this.key}`);
            }
        },
        computed: {
            message: function(): string {
                if (this.key) return `!orga login ${this.key}`;
                else return '';
            }
        },
    })
</script>

<style scoped>

</style>