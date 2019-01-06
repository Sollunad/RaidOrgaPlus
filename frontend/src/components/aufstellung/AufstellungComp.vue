<template>
    <div class="aufstellung">
        <AufstellungHeaderComp
            v-bind:aufstellungId="aufstellungId"
            v-bind:role="role"
            v-bind:active="active"
            v-bind:success="success"
            v-on:deleteBoss="deleteBoss"
            v-on:toggleSuccess="toggleSuccess">
        </AufstellungHeaderComp>
        <AufstellungBodyComp
                v-bind:aufstellungId="aufstellungId"
                v-bind:raid="raid"
                v-bind:active="active">
        </AufstellungBodyComp>
    </div>
</template>

<script>
    import AufstellungHeaderComp from "./AufstellungHeaderComp";
    import AufstellungBodyComp from "./AufstellungBodyComp";
    import aufstellung from '../../services/aufstellung';

    export default {
        name: "AufstellungComp",
        components: {AufstellungBodyComp, AufstellungHeaderComp},
        props: ['aufstellungId', 'raid', 'role', 'active'],
        data: () => ({
            success: false
        }),
        methods: {
            deleteBoss: function() {
                this.$emit('deleteBoss', this.aufstellungId);
            },
            toggleSuccess: function() {
                this.success = !this.success;
                aufstellung.setSuccess(this.aufstellungId, this.success);
            }
        },
        created: async function() {
            if (!this.active) {
                this.success = await aufstellung.getSuccess(this.aufstellungId);
            }
        }
    }
</script>

<style scoped>
    .aufstellung {
        background-color: #222222;
        width: fit-content;
    }
</style>