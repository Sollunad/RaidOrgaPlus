<template>
    <div>
        <h2>Passwort ändern</h2>
        <p></p>
        <v-form ref="form" v-model="valid" lazy-validation class="form" >
            <v-text-field
                    @keypress.enter="submit"
                    v-model="oldPassword"
                    :rules="passwordRules"
                    label="Altes Passwort"
                    type="password"
                    required
            ></v-text-field>
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
    import _users from '../../services/endpoints/users';

    export default {
        name: "ProfilePasswordComp",
        props: ['user'],
        data: () => ({
            valid: true,
            oldPassword: '',
            newPassword: '',
            passwordRules: [
                v => !!v || 'Bitte gib dein Passwort an',
            ],
            buttonColor: '',
            buttonText: 'Passwort aktualisieren'
        }),
        computed: {
            passwordRepeatRules: function() {
                return [
                    v => v === this.newPassword || 'Passwörter müssen übereinstimmen'
                ]
            }
        },
        methods: {
            async submit() {
                if (this.$refs.form.validate()) {
                    if (this.user) {
                        const response = await _users.changePassword(this.oldPassword, this.newPassword);
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
                            that.buttonText = 'Passwort aktualisieren';
                        }, 2000)
                    }
                }
            },
        }
    }
</script>

<style scoped>

</style>