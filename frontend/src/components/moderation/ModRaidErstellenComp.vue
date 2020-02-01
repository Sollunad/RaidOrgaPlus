<template>
    <v-dialog width="unset" class="erstellenButton" v-model="open">
        <template v-slot:activator="{on}">
            <v-btn color="success" v-on="on" class="erstellenButton">
                Raid erstellen
            </v-btn>
        </template>
        <div class="container">
            <v-text-field
                    @keypress.enter="submit"
                    v-model="enteredName"
                    label="Name des Raids"
                    outline
            ></v-text-field>
            <v-btn
                    @click="submit">
                Raid erstellen
            </v-btn>
        </div>
    </v-dialog>
</template>

<script>
    import _moderation from '../../services/endpoints/moderation';

    export default {
        name: "ModRaidErstellenComp",
        data: () => ({
            enteredName: '',
            open: false
        }),
        methods: {
            submit: async function() {
                if (this.enteredName) {
                    await _moderation.createRaid(this.enteredName);
                    this.open = false;
                    this.enteredName = '';
                    this.$emit('refresh');
                }
            }
        }
    }
</script>

<style scoped>
    .container {
        background-color: #444444;
        padding: 10px;
    }

    .erstellenButton {
        margin: 5px 0 10px 10px;
    }
</style>
