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
                    counter="10"
            ></v-text-field>
            <v-text-field
                    @keypress.enter="submit"
                    v-if="registerMode"
                    v-model="email"
                    :rules="emailRules"
                    label="E-Mail-Adresse"
                    required
            ></v-text-field>
            <v-text-field
                    @keypress.enter="submit"
                    v-model="password"
                    :rules="passwordRules"
                    type="password"
                    label="Passwort"
                    required
            ></v-text-field>
            <v-text-field
                    @keypress.enter="submit"
                    v-if="registerMode"
                    :rules="passwordRepeatRules"
                    type="password"
                    label="Passwort wiederholen"
                    required
            ></v-text-field>
            <v-btn
                    @click="submit"
                    :color=buttonColor
                    text
            >
                {{ buttonText }}
            </v-btn>
            <v-btn
                    v-if="!registerMode"
                    @click="passwordDialogOpen = true"
                    text
            >
                Passwort vergessen?
            </v-btn>
            <v-progress-circular
                    v-if="loading"
                    indeterminate
                    color="primary"
            ></v-progress-circular>
            <v-snackbar
                    v-model="snackbar"
                    :timeout="5000"
                    :top="true"
            >
                {{ failureText }}
                <v-btn
                        color="pink"
                        text
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
        <PasswordForgotDialog
            v-bind:open="passwordDialogOpen"
            v-on:close="closeDialog">
        </PasswordForgotDialog>
    </div>
</template>

<script>
    import _users from '../../services/endpoints/users';
    import _cookies from '../../services/util/cookies';
    import PasswordForgotDialog from "./PasswordForgotDialog";

    export default {
        name: "LoginComp",
        components: {PasswordForgotDialog},
        data: () => ({
            valid: true,
            accName: '',
            accNameRules: [
                v => !!v || 'Bitte gib deinen Accountnamen an',
                v => /^[a-zA-Z\s]+.\d{4}$/.test(v) || 'Bitte gib einen gültigen Accountnamen an',
            ],
            name: '',
            nameRules: [
                v => !!v || 'Bitte gib deinen Anzeigenamen an',
                v => v.length <= 10 || 'Bitte wähle einen kürzeren Namen',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Bitte gib dein Passwort an',
            ],
            email: '',
            emailRules: [
                v => !!v || 'Bitte gib eine E-Mail-Adresse an',
                v => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)+$/.test(v) || 'Bitte gib eine gültige E-Mail-Adresse an',
            ],
            buttonColor: '',
            snackbar: false,
            registerMode: false,
            loading: false,
            passwordDialogOpen: false,
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
            passwordRepeatRules: function() {
                return [
                    v => v === this.password || 'Passwörter müssen übereinstimmen'
                ]
            }
        },
        methods: {
            async submit () {
                if (this.$refs.form.validate()) {
                    this.loading = true;
                    if (this.registerMode) this.register();
                    else this.login();
                }
            },
            async login() {
                const uuid = await _users.login(this.accName, this.password);
                if (uuid) {
                    this.buttonColor = 'success';
                    _cookies.setCookie('session', uuid);
                    window.location.href = '/';
                } else {
                    this.loading = false;
                    this.snackbar = true;
                }
            },
            async register() {
                const success = await _users.register(this.accName, this.password, this.name, this.email);
                if (success) {
                    this.login();
                } else {
                    this.loading = false;
                    this.snackbar = true;
                }
            },
            closeDialog() {
                this.passwordDialogOpen = false;
            }
        }
    }
</script>

<style scoped>

</style>