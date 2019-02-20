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
            ></v-text-field>
            <v-text-field
                    @keypress.enter="submit"
                    v-model="password"
                    :rules="passwordRules"
                    label="Passwort bestätigen"
                    type="password"
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
    import _users from '../../services/endpoints/users';

    export default {
        name: "ProfileEmailComp",
        props: ['user'],
        data: () => ({
            valid: true,
            email: '',
            emailRules: [
                v => !!v || 'Bitte gib eine E-Mail-Adresse an',
                v => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/.test(v) || 'Bitte gib eine gültige E-Mail-Adresse an',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Bitte gib dein Passwort an',
            ],
            buttonColor: '',
            buttonText: 'E-Mail aktualisieren'
        }),
        methods: {
            async submit() {
                if (this.$refs.form.validate()) {
                    if (this.user) {
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
                }
            },
        }
    }
</script>

<style scoped>

</style>