<template>
    <v-form ref="form" v-model="valid" lazy-validation class="form" >
        <v-text-field
                @keypress.enter="submit"
                v-model="apiKey"
                :rules="apiKeyRules"
                label="API-Key"
                required
        ></v-text-field>
        <v-btn
                @click="submit"
                :color=buttonColor
        >
            {{ buttonText }}
        </v-btn>
        <v-snackbar
                v-model="snackbar"
                :timeout="5000"
                :top="true"
        >
            {{ snackbarText }}
            <v-btn
                    color="pink"
                    flat
                    @click="snackbar = false"
            >
                OK
            </v-btn>
        </v-snackbar>
    </v-form>
</template>

<script>
    import _users from '../../services/endpoints/users';

    export default {
        name: "ProfileAPIKeyComp",
        props: ['user'],
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
        },
        methods: {
            async submit() {
                if (this.$refs.form.validate()) {
                    const response = await _users.setApi(this.user.id, this.apiKey);
                    if (response === 'Success') {
                        this.buttonColor = 'success';
                        this.buttonText = 'Success!';
                    } else if (response === 'Permissions') {
                        this.snackbarText = 'Fehlende Berechtigungen für den API-Key (account, progression)';
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

</style>