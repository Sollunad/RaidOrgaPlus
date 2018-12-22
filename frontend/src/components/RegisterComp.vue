<template>
    <v-form ref="form" v-model="valid" lazy-validation class="form">
        <v-text-field
                v-model="accName"
                :rules="accNameRules"
                label="Accountname"
                required
        ></v-text-field>
        <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Anzeigename"
                required
        ></v-text-field>
        <v-text-field
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
            Registrieren
        </v-btn>
        <v-snackbar
                v-model="snackbar"
                timeout=5000
                top="true"
        >
            Registrieren fehlgeschlagen!
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
    import login from '../services/login.js';
    import register from '../services/register.js';

    export default {
        name: "LoginComp",
        data: () => ({
            valid: true,
            accName: '',
            accNameRules: [
                v => !!v || 'Bitte gib deinen Accountnamen an',
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
            snackbar: false
        }),

        methods: {
            async submit () {
                if (this.$refs.form.validate()) {
                    const success = await register.register(this.accName, this.name, this.password);
                    if (success) {
                        this.buttonColor = 'success';
                        localStorage.session = await login.login(this.accName, this.password);
                        window.location.reload();
                    } else {
                        this.snackbar = true;
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>