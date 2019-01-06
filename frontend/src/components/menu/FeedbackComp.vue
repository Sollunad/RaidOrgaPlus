<template>
    <div>
        <v-layout row wrap
                  v-if="!submitted">
            <v-flex sm6>
                <v-form ref="form">
                    <v-textarea
                            v-model="feedbackText"
                            label="Platz für dein Feedback (Anregungen, Wünsche, Bugs, etc...)"
                            value=""
                            :rules="feedbackRules"
                            counter="1000"
                    ></v-textarea>
                    <v-btn
                            @click="submit"
                    >
                        Abschicken
                    </v-btn>
                </v-form>
            </v-flex>
        </v-layout>
        <p v-else>
            Vielen Dank für dein Feedback!
        </p>
    </div>
</template>

<script>
    import feedback from '../../services/feedback';

    export default {
        name: "FeedbackComp",
        props: ['user'],
        data: () => ({
            buttonColor: '',
            feedbackRules: [
                v => !!v || 'Dieses Feld darf nicht leer sein'
            ],
            submitted: false,
            feedbackText: ''
        }),
        methods: {
            submit: function() {
                if (this.$refs.form.validate()) {
                    this.submitted = true;
                    feedback.feedback(this.feedbackText, this.user.accname);
                }
            }
        }
    }
</script>

<style scoped>

</style>