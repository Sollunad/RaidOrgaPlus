<template>
    <div>
        <v-form ref="form" v-model="valid" lazy-validation class="form" >
            <v-text-field
                    @keypress.enter="submit"
                    v-model="accName"
                    :rules="accNameRules"
                    label="Accountname"
                    required
            ></v-text-field>
            <v-text-field
                    @keypress.enter="submit"
                    v-if="registerMode"
                    v-model="name"
                    :rules="nameRules"
                    label="Anzeigename"
                    required
            ></v-text-field>
            <v-text-field
                    @keypress.enter="submit"
                    v-model="password"
                    :rules="passwordRules"
                    :type="'password'"
                    label="Passwort"
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
                    timeout=5000
                    top="true"
            >
                {{ failureText }}
                <v-btn
                        color="pink"
                        flat
                        @click="snackbar = false"
                >
                    OK
                </v-btn>
            </v-snackbar>
        </v-form>
        <v-checkbox
                v-model="registerMode"
                label="Neu registrieren?"
        ></v-checkbox>
    </div>
</template>

<script>
    import login from '../services/login.js';
    import register from '../services/register.js';

    export default {
        name: "LoginComp",
        data: () => ({
            valid: true,
            accName: '',
            accNameRules: [
                v => !!v || 'Bitte gib deinen Accountnamen an',
                v => /\w+.\d{4}/.test(v) || 'Bitte gib einen gültigen Accountnamen an',
            ],
            name: '',
            nameRules: [
                v => !!v || 'Bitte gib deinen Anzeigenamen an',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Bitte gib dein Passwort an',
            ],
            buttonColor: '',
            snackbar: false,
            registerMode: false
        }),
        computed: {
            failureText: function() {
                if (this.registerMode) return 'Registrieren fehlgeschlagen';
                else return 'Anmeldedaten inkorrekt';
            },
            buttonText: function() {
                if (this.registerMode) return 'Registrieren';
                else return 'Anmelden';
            },
        },
        methods: {
            async submit () {
                if (this.$refs.form.validate()) {
                    if (this.registerMode) this.register();
                    else this.login();
                }
            },
            async login() {
                const session = await login.login(this.accName, this.password);
                if (session) {
                    this.buttonColor = 'success';
                    localStorage.session = session;
                    window.location.href = '/';
                } else {
                    this.snackbar = true;
                }
            },
            async register() {
                const success = await register.register(this.accName, this.password, this.name);
                if (success) {
                    this.login();
                } else {
                    this.snackbar = true;
                }
            }
        }
    }
</script>

<style scoped>

</style>