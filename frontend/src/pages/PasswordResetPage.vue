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
                    :color="buttonColor"
            >
                {{ buttonText }}
            </v-btn>
        </v-form>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _users from '../services/endpoints/users';
	import type { VForm } from '../models/Types';

    export default Vue.extend({
        name: "PasswordResetPage",
        data: () => ({
            valid: true,
            newPassword: '',
            passwordRules: [
                (v: string) => !!v || 'Bitte gib dein Passwort an',
            ],
            buttonColor: '',
            buttonText: 'Passwort aktualisieren'
        }),
        computed: {
            token: function(): string {
                return this.$route.params.token;
            },
            passwordRepeatRules: function() {
                return [
                    (v: string) => v === this.newPassword || 'Passwörter müssen übereinstimmen'
                ]
            },
			form: function(): VForm {
				return this.$refs.form as VForm;
			}
        },
        methods: {
            async submit(): Promise<void> {
                if (this.form.validate()) {
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
    })
</script>

<style scoped>
    .form {
        margin: 5%;
    }
</style>