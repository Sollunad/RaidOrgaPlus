<template>
    <v-form ref="form" v-model="valid" lazy-validation class="form">
        <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Accountname"
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
            {{ buttonText }}
        </v-btn>
        <v-snackbar
                v-model="snackbar"
                timeout=5000
                top="true"
        >
            Ungültige Login-Daten!
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

    export default {
        name: "LoginComp",
        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Bitte gib deinen Accountnamen an',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Bitte gib dein Passwort an',
            ],
            buttonText: 'Anmelden',
            buttonColor: '',
            snackbar: false
        }),

        methods: {
            async submit () {
                if (this.$refs.form.validate()) {
                    const session = await login.login(this.name, this.password);
                    if (session) {
                        localStorage.session = session;
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
    .form {
        margin: 10%;
    }
</style>