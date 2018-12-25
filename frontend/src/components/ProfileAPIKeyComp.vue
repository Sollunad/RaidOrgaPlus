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
                :timeout=5000
                :top="true"
        >
            Fehlgeschlagen! Gehört der API-Key zu deinem Account?
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
    import db_user from '../services/user';

    export default {
        name: "ProfileAPIKeyComp",
        props: ['user'],
        data: () => ({
            valid: true,
            apiKey: '',
            apiKeyRules: [
                v => !!v || 'Bitte gib deinen API-Key an',
            ],
            snackbar: false,
            buttonColor: '',
            buttonText: 'Aktualisieren'
        }),
        methods: {
            async submit() {
                if (this.$refs.form.validate()) {
                    const success = await db_user.setApi(this.user.id, this.apiKey);
                    if (success) {
                        this.buttonColor = 'success';
                        this.buttonText = 'Success!';
                    }
                    else this.snackbar = true;
                }
            },
        }
    }
</script>

<style scoped>

</style>