<template>
    <div>
        <TerminToolbarComp
            v-on:anmelden="anmelden"
            v-bind:anmeldung="anmeldung"
            v-on:addBoss="addBoss">
        </TerminToolbarComp>
        <div v-if="aufstellungen">
            <v-container grid-list-md>
                <v-layout row wrap>
                    <v-flex
                            v-for="aufstellungId in aufstellungen"
                            :key="aufstellungId"
                            xs12 sm6 xl4>
                        <AufstellungComp
                                v-bind:aufstellungId="aufstellungId"
                                v-bind:raid="raid"
                                v-on:deleteBoss="deleteBoss">
                        </AufstellungComp>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>
    import TerminToolbarComp from "../components/aufstellung/TerminToolbarComp";
    import AufstellungComp from '../components/aufstellung/AufstellungComp';
    import aufstellung from '../services/aufstellung';
    import termin from '../services/termin';

    export default {
        name: "AufstellungPage",
        components: {TerminToolbarComp, AufstellungComp},
        props: ['terminId', 'raid', 'role', 'user'],
        data: () => ({
            aufstellungen: null
        }),
        asyncComputed: {
            anmeldung: function() {
                if (this.terminId) return termin.getAnmeldung(this.user.id, this.terminId);
                else return null;
            }
        },
        methods: {
            anmelden: function(type) {
                termin.anmelden(this.user.id, this.terminId, type);
            },
            addBoss: async function(info) {
                const [boss, wing] = info;
                if (boss === 0) {
                    this.aufstellungen = await termin.addWing(this.terminId, wing);
                } else {
                    this.aufstellungen = await termin.addBoss(this.terminId, boss);
                }
            },
            deleteBoss: async function(aufstellungId) {
                this.aufstellungen = await aufstellung.deleteBoss(aufstellungId, this.terminId);
            }
        },
        created: async function() {
            if (this.terminId === 0) window.location.href = '/#/raids';
            else {
                this.aufstellungen = await aufstellung.getForTermin(this.terminId);
            }
        }
    }
</script>

<style scoped>

</style>