<template>
    <div class="aufstellung">
        <AufstellungHeaderComp
            v-bind:aufstellung="aufstellung"
            v-bind:role="role"
            v-bind:active="active"
            v-bind:success="success"
            v-bind:uploadActive="uploadActive"
            v-bind:copyActive="copyActive"
            v-bind:wsClient="wsClient"
            v-on:deleteBoss="deleteBoss"
            v-on:toggleSuccess="toggleSuccess"
            v-on:refresh="refresh"
            v-on:copy="copy">
        </AufstellungHeaderComp>
        <AufstellungBodyComp
                v-if="!copyActive"
                v-bind:aufstellung="aufstellung"
                v-bind:raid="raid"
                v-bind:active="active"
                v-bind:locked="locked"
                v-bind:role="role"
                v-bind:termin="termin"
                v-bind:propElements="elements"
                v-bind:anmeldungen="anmeldungen"
                v-bind:wsClient="wsClient"
                v-bind:ersatz="ersatz">
        </AufstellungBodyComp>
        <MenuAufstellungenComp
            v-else
            v-bind:aufstellung="aufstellung"
            v-bind:all="all"
            v-bind:wsClient="wsClient"
            v-on:refresh="refresh"
            class="menu">
        </MenuAufstellungenComp>
    </div>
</template>

<script>
    import AufstellungHeaderComp from "./AufstellungHeaderComp";
    import AufstellungBodyComp from "./AufstellungBodyComp";
    import _aufstellungen from '../../services/endpoints/aufstellungen';
    import MenuAufstellungenComp from "./MenuAufstellungenComp";

    export default {
        name: "AufstellungComp",
        components: {MenuAufstellungenComp, AufstellungBodyComp, AufstellungHeaderComp},
        props: ['aufstellung', 'all', 'raid', 'role', 'active', 'locked', 'elements', 'termin', 'anmeldungen', 'ersatz', 'uploadActive', 'wsClient'],
        data: () => ({
            success: false,
            copyActive: false,
        }),
        methods: {
            deleteBoss: function() {
                this.$emit('deleteBoss', this.aufstellung.id);
            },
            toggleSuccess: async function() {
                this.success = !this.success;
                await _aufstellungen.setSuccess(this.aufstellung.id, this.success);
            },
            refresh: function() {
                this.copyActive = false;
                this.$emit('refresh');
            },
            copy: function() {
                this.copyActive = !this.copyActive;
            }
        },
        created: async function() {
            if (!this.active) {
                this.success = this.aufstellung.success;
            }
        }
    }
</script>

<style scoped>
    .aufstellung {
        background-color: #222222;
        width: 100%;
        height: 100%;
        box-shadow: 1px 1px 3px black;
    }

</style>