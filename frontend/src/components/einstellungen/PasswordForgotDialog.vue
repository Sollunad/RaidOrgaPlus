<template>
    <v-dialog
            v-model="openComputed"
            max-width="290"
    >
        <v-card>
            <v-card-title class="headline">Passwort vergessen</v-card-title>

            <v-card-text>
                Bitte gib deinen Accountnamen ein. Du erhältst dann eine E-Mail mit weiteren Anweisungen.
            </v-card-text>

            <v-text-field
                    v-model="accname"
                    single-line
                    box
                    :rules="accNameRules"
                    class="textfield"
            ></v-text-field>

            <v-card-actions>
                <v-btn
                        text
                        @click="resetPassword"
                >
                    {{ buttonText }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _users from '../../services/endpoints/users';

    export default Vue.extend({
        name: "PasswordForgotDialog",
        props: ['open'],
        data: () => ({
            accname: '',
            accNameRules: [
                (v: boolean) => !!v || 'Bitte gib deinen Accountnamen an',
                (v: string) => /^[a-zA-Z\s]+.\d{4}$/.test(v) || 'Bitte gib einen gültigen Accountnamen an',
            ],
            buttonText: 'E-Mail senden',
            buttonClicked: false,
        }),
        computed: {
            openComputed: {
                get: function(): any {
                    return this.open;
                },
                set: function(): void {
                    this.$emit('close');
                }
            }
        },
        methods: {
            resetPassword: async function(): Promise<void> {
                if (!this.buttonClicked) {
                    this.buttonClicked = true;
                    if (/^[a-zA-Z]+.\d{4}$/.test(this.accname)) {
                        await _users.createResetToken(this.accname);
                        this.$emit('close');
                        this.buttonClicked = false;
                    } else {
                        this.buttonClicked = false;
                    }
                }
            }
        }
    })
</script>

<style scoped>
    .textfield {
        margin: 0 10px 0 10px;
    }
</style>