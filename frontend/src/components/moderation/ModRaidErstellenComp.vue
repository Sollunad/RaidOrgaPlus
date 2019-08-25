<template>
    <v-dialog width="fit-content" class="erstellenButton" v-model="open">
        <v-btn color="success" slot="activator">
            Raid erstellen
        </v-btn>
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
                    this.$emit('raid-created');
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
        margin-bottom: 10px;
    }
</style>