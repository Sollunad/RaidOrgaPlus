<template>
    <div>
        <h2>API-Key hinzufügen oder ändern</h2>
        <p></p>
        <v-form ref="form" v-model="valid" lazy-validation class="form" >
            <v-text-field
                    @keypress.enter="submit"
                    v-model="apiKey"
                    :rules="apiKeyRules"
                    label="Neuer API-Key"
                    required
                    outline
            ></v-text-field>
            <v-btn
                    @click="submit"
                    :color=buttonColor
            >
                {{ buttonText }}
            </v-btn>
            <v-tooltip right>
                <template v-slot:activator="{on}">
                    <v-btn icon v-on="on" class="tooltipButton">
                        <v-icon>help</v-icon>
                    </v-btn>
                </template>
                {{ permissionsText }}
            </v-tooltip>
            <v-snackbar
                    v-model="snackbar"
            >
                {{ snackbarText }}
                <v-btn
                        color="pink"
                        @click="snackbar = false"
                >
                    OK
                </v-btn>
            </v-snackbar>
        </v-form>
    </div>
</template>

<script>
    import _users from '../../services/endpoints/users';

    export default {
        name: "EinstellungenAPIKeyComp",
        data: () => ({
            valid: true,
            apiKey: '',
            regex: /[A-Z\d]{8}-([A-Z\d]{4}-){3}[A-Z\d]{20}-([A-Z\d]{4}-){3}[A-Z\d]{12}/,
            snackbar: false,
            snackbarText: '',
            buttonColor: '',
            buttonText: 'API-Key aktualisieren'
        }),
        computed: {
            apiKeyRules: function() {
                return [
                    v => !!v || 'Bitte gib einen API-Key an',
                    v => this.regex.test(v) || 'Bitte gib einen gültigen API-Key an',
                ]
            },
            permissionsText: function() {
                const required = ['account', 'builds', 'characters', 'inventories', 'progression', 'unlocks'];
                return `Benötigt: ${required.join(', ')}`;
            }
        },
        methods: {
            async submit() {
                if (this.$refs.form.validate()) {
                    const response = await _users.setApi(this.apiKey);
                    this.snackbar = true;
                    this.snackbarText = "Test!";
                    if (response === 'Success') {
                        this.buttonColor = 'success';
                        this.buttonText = 'Success!';
                        const that = this;
                        setTimeout(function() {
                            that.buttonColor = '';
                            that.buttonText = 'API-Key aktualisieren';
                        }, 2000)
                    } else if (response === 'Permissions') {
                        this.snackbarText = 'Fehlende Berechtigungen für den API-Key (siehe ?-Tooltip)';
                        this.snackbar = true;
                    } else if (response === 'Wrong account') {
                        this.snackbarText = 'Der API-Key gehört nicht zu deinem Account!';
                        this.snackbar = true;
                    } else {
                        this.snackbarText = 'Ein Fehler ist aufgetreten';
                        this.snackbar = true;
                    }
                }
            },
        }
    }
</script>

<style scoped>
 .tooltipButton {
     margin-left: 5px;
 }
</style>