<template>
    <v-form ref="form" v-model="valid" lazy-validation class="form" >
        <v-text-field
                @keypress.enter="submit"
                v-model="name"
                :rules="nameRules"
                label="Neuer Anzeigename"
                required
        ></v-text-field>
        <v-btn
                @click="submit"
                :color=buttonColor
        >
            {{ buttonText }}
        </v-btn>
    </v-form>
</template>

<script>
    import db_user from '../../services/endpoints/users';

    export default {
        name: "ProfileNameComp",
        props: ['user'],
        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Bitte gib einen Namen an'
            ],
            buttonColor: '',
            buttonText: 'Anzeigenamen aktualisieren'
        }),
        methods: {
            async submit() {
                if (this.$refs.form.validate()) {
                    if (this.user) {
                        db_user.changeName(this.user.id, this.name);
                        this.buttonText = 'success';
                        this.buttonColor = 'success';
                    }
                }
            },
        }
    }
</script>

<style scoped>

</style>