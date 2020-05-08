<template>
    <div>
        <h2>Neuer Termin</h2>
        <p></p>
        <v-form ref="form" v-model="valid" lazy-validation>

            <v-container>
                <v-row>
                    <v-col cols="12" md="6" lg="5" xl="4">
                        <v-date-picker
                                v-model="date"
                                scrollable
                                locale="de-DE"
                                :first-day-of-week="1">
                        </v-date-picker>
                    </v-col>
                    <v-col cols="12" sm="6" lg="3">
                        <v-text-field
                                v-model="time"
                                label="Beginn"
                                prepend-icon="access_time"
                                :rules="validationRulesStart"
                        ></v-text-field>
                        <v-text-field
                                v-model="endtime"
                                label="Ende (optional)"
                                prepend-icon="access_time"
                                :rules="validationRulesEnd"
                        ></v-text-field>
                        <v-btn
                                @click="submit"
                                :color=buttonColor>
                            OK
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>

<script>
    import _termine from '../../services/endpoints/termine';

    export default {
        name: "NeuerTerminComp",
        data: () => ({
            valid: true,
            date: new Date().toISOString().substr(0, 10),
            time: null,
            endtime: null,
            datePicker: false,
            timePicker: false,
            validationRulesStart: [
                v => !!v || 'Feld darf nicht leer sein',
                v => /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(v) || 'Bitte gib eine gültige Uhrzeit an',
            ],
            validationRulesEnd: [
                v => !v || /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(v) || 'Bitte gib eine gültige Uhrzeit an',
            ],
            buttonColor: ''
        }),
        computed: {
            raid: function() {
                return this.$store.getters.raid;
            }
        },
        methods: {
            submit: async function() {
                if (this.$refs.form.validate()) {
                    this.buttonColor = 'success';
                    await _termine.newTermin(this.raid.id, this.date, this.time, this.endtime);
                    window.history.back();
                }
            }
        }
    }
</script>

<style scoped>

</style>