<template>
    <div>
        <h2>Anzeigename ändern</h2>
        <p></p>
        <v-form ref="form" v-model="valid" lazy-validation class="form" >
            <v-text-field
                    @keypress.enter="submit"
                    v-model="name"
                    :rules="nameRules"
                    label="Neuer Anzeigename"
                    required
                    counter="10"
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
        name: "ProfileNameComp",
        props: ['user'],
        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Bitte gib einen Namen an',
                v => v.length <= 10 || 'Bitte wähle einen kürzeren Namen'
            ],
            buttonColor: '',
            buttonText: 'Anzeigenamen aktualisieren'
        }),
        methods: {
            async submit() {
                if (this.$refs.form.validate()) {
                    if (this.user) {
                        await _users.changeName(this.name);
                        this.buttonText = 'success';
                        this.buttonColor = 'success';
                        this.$emit('changeName', this.name);
                        const that = this;
                        setTimeout(function() {
                            that.buttonColor = '';
                            that.buttonText = 'Anzeigenamen aktualisieren';
                        }, 2000)
                    }
                }
            },
        }
    }
</script>

<style scoped>

</style>