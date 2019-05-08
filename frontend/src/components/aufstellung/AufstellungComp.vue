<template>
    <div class="aufstellung">
        <AufstellungHeaderComp
            v-bind:aufstellung="aufstellung"
            v-bind:role="role"
            v-bind:active="active"
            v-bind:success="success"
            v-bind:all="all"
            v-on:deleteBoss="deleteBoss"
            v-on:toggleSuccess="toggleSuccess"
            v-on:refresh="refresh">
        </AufstellungHeaderComp>
        <AufstellungBodyComp
                v-bind:aufstellung="aufstellung"
                v-bind:raid="raid"
                v-bind:active="active"
                v-bind:locked="locked"
                v-bind:role="role"
                v-bind:termin="termin"
                v-bind:propElements="elements"
                v-bind:anmeldungen="anmeldungen"
                v-bind:ersatz="ersatz">
        </AufstellungBodyComp>
    </div>
</template>

<script>
    import AufstellungHeaderComp from "./AufstellungHeaderComp";
    import AufstellungBodyComp from "./AufstellungBodyComp";
    import _aufstellungen from '../../services/endpoints/aufstellungen';

    export default {
        name: "AufstellungComp",
        components: {AufstellungBodyComp, AufstellungHeaderComp},
        props: ['aufstellung', 'all', 'raid', 'role', 'active', 'locked', 'elements', 'termin', 'anmeldungen', 'ersatz'],
        data: () => ({
            success: false
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
                this.$emit('refresh');
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
    }
</style>