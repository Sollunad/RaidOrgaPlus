<template>
    <div>
        <h2>Neuer Termin</h2>
        <p></p>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-dialog
                    ref="datePicker"
                    v-model="datePicker"
                    :return-value.sync="date"
                    persistent
                    lazy
                    full-width
                    width="290px"
            >
                <v-text-field
                        slot="activator"
                        v-model="dateFormatted"
                        label="Datum"
                        prepend-icon="event"
                        readonly
                        :rules="validationRules"
                ></v-text-field>
                <v-date-picker
                        v-model="date"
                        scrollable
                        locale="de-DE"
                        :first-day-of-week="1">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="datePicker = false">Abbrechen</v-btn>
                    <v-btn flat color="primary" @click="$refs.datePicker.save(date)">OK</v-btn>
                </v-date-picker>
            </v-dialog>
            <v-dialog
                    ref="timePicker"
                    v-model="timePicker"
                    :return-value.sync="time"
                    persistent
                    lazy
                    full-width
                    width="290px"
            >
                <v-text-field
                        slot="activator"
                        v-model="time"
                        label="Uhrzeit"
                        prepend-icon="access_time"
                        readonly
                        :rules="validationRules"
                ></v-text-field>
                <v-time-picker
                        v-if="timePicker"
                        v-model="time"
                        full-width
                        format="24hr"
                >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="timePicker = false">Abbrechen</v-btn>
                    <v-btn flat color="primary" @click="$refs.timePicker.save(time)">OK</v-btn>
                </v-time-picker>
            </v-dialog>
            <v-btn
                    @click="submit"
                    :color=buttonColor>
                OK
            </v-btn>
        </v-form>
    </div>
</template>

<script>
    import termin from '../../services/termine';

    export default {
        name: "NeuerTerminComp",
        props: ['raid'],
        data: () => ({
            valid: true,
            date: new Date().toISOString().substr(0, 10),
            time: null,
            datePicker: false,
            timePicker: false,
            validationRules: [
                v => !!v || 'Feld darf nicht leer sein'
            ],
            buttonColor: ''
        }),
        computed: {
            dateFormatted: function() {
                if (!this.date) return null;
                const [year, month, day] = this.date.split('-')
                return `${day}.${month}.${year}`
            }
        },
        methods: {
            submit: function() {
                if (this.$refs.form.validate()) {
                    this.buttonColor = 'success';
                    termin.newTermin(this.raid.id, this.date, this.time).then(() => {
                        window.history.back();
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>