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
                                :color="buttonColor">
                            OK
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>

<script lang="ts">
	import { VForm } from '@/models/Types';
	import Vue from 'vue';
    import _termine from '../../services/endpoints/termine';

    export default Vue.extend({
        name: "NeuerTerminComp",
        data: () => ({
            valid: true,
            date: new Date().toISOString().substr(0, 10),
            time: '',
            endtime: '',
            datePicker: false,
            timePicker: false,
            validationRulesStart: [
                (v: string) => !!v || 'Feld darf nicht leer sein',
                (v: string) => /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(v) || 'Bitte gib eine gültige Uhrzeit an',
            ],
            validationRulesEnd: [
                (v: string) => !v || /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(v) || 'Bitte gib eine gültige Uhrzeit an',
            ],
            buttonColor: ''
        }),
        computed: {
            raid: function(): any {
                return this.$vStore.getters.raid;
            },
			form: function(): VForm {
				return this.$refs.form as VForm;
			}
        },
        methods: {
            submit: async function(): Promise<void> {
                if (this.form.validate()) {
                    this.buttonColor = 'success';
                    await _termine.newTermin(this.raid.id, this.date, this.time, this.endtime);
                    window.history.back();
                }
            }
        },
        watch: {
            time: function(newVal: string, oldVal: string): void {
                if (oldVal.length === 1 && newVal.length === 2) {
                    this.time = this.time + ':';
                }
                if (oldVal.length === 3 && newVal.length === 2 && oldVal.endsWith(':')) {
                    this.time = this.time.slice(0, -1);
                }
            },
            endtime: function(newVal: string, oldVal: string): void {
                if (oldVal.length === 1 && newVal.length === 2) {
                    this.endtime = this.endtime + ':';
                }
                if (oldVal.length === 3 && newVal.length === 2 && oldVal.endsWith(':')) {
                    this.endtime = this.endtime.slice(0, -1);
                }
            },
        }
    })
</script>

<style scoped>

</style>