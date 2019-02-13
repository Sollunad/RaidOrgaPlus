<template>
    <div>
        <v-form ref="form" v-model="valid" lazy-validation class="form" v-if="token">
            <v-text-field
                    @keypress.enter="submit"
                    v-model="newPassword"
                    :rules="passwordRules"
                    type="password"
                    label="Neues Passwort"
                    required
            ></v-text-field>
            <v-text-field
                    @keypress.enter="submit"
                    :rules="passwordRepeatRules"
                    type="password"
                    label="Neues Passwort wiederholen"
                    required
            ></v-text-field>
            <v-btn
                    @click="submit"
                    :color=buttonColor
            >
                {{ buttonText }}
            </v-btn>
        </v-form>
    </div>
</template>

<script>
    import _users from '../services/endpoints/users';

    export default {
        name: "PasswordResetPage",
        data: () => ({
            valid: true,
            newPassword: '',
            passwordRules: [
                v => !!v || 'Bitte gib dein Passwort an',
            ],
            buttonColor: '',
            buttonText: 'Passwort aktualisieren'
        }),
        computed: {
            token: function() {
                return this.$route.params.token;
            },
            passwordRepeatRules: function() {
                return [
                    v => v === this.newPassword || 'Passwörter müssen übcereinstimmen'
                ]
            }
        },
        methods: {
            async submit() {
                if (this.$refs.form.validate()) {
                    if (this.token) {
                        const response = await _users.resetPassword(this.token, this.newPassword);
                        if (response.length > 0) {
                            this.buttonColor = 'success';
                            window.location.href = '/';
                        } else {
                            this.buttonColor = 'error';
                            this.buttonText = 'Link ungültig';
                        }
                    }
                }
            },
        }
    }
</script>

<style scoped>
    .form {
        margin: 5%;
    }
</style>