<template>
    <div>
        <h2>E-Mail-Adresse ändern</h2>
        <p></p>
        <v-form ref="form" v-model="valid" lazy-validation class="form" >
            <v-text-field
                    @keypress.enter="submit"
                    v-model="email"
                    :rules="emailRules"
                    label="Neue E-Mail-Adresse"
                    required
                    outline
            ></v-text-field>
            <v-text-field
                    @keypress.enter="submit"
                    v-model="password"
                    :rules="passwordRules"
                    label="Passwort bestätigen"
                    type="password"
                    required
                    outline
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
	import { VForm } from '@/models/Types';
	import Vue from 'vue';
    import _users from '../../services/endpoints/users';

    export default Vue.extend({
        name: "ProfileEmailComp",
        data: () => ({
            valid: true,
            email: '',
            emailRules: [
                (v: boolean) => v || 'Bitte gib eine E-Mail-Adresse an',
                (v: string) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)+$/.test(v) || 'Bitte gib eine gültige E-Mail-Adresse an',
            ],
            password: '',
            passwordRules: [
                (v: boolean) => v || 'Bitte gib dein Passwort an',
            ],
            buttonColor: '',
            buttonText: 'E-Mail aktualisieren'
        }),
		computed: {
			form: function(): VForm {
				return this.$refs.form as VForm;
			}
		},
        methods: {
            async submit(): Promise<void> {
                if (this.form.validate()) {
                    const response = await _users.changeEmail(this.email, this.password);
                    if (response) {
                        this.buttonText = 'success';
                        this.buttonColor = 'success';
                    } else {
                        this.buttonText = 'Passwort falsch';
                        this.buttonColor = 'error';
                    }
                    const that = this;
                    setTimeout(function() {
                        that.buttonColor = '';
                        that.buttonText = 'E-Mail aktualisieren';
                    }, 2000)
                }
            },
        }
    })
</script>

<style scoped>

</style>