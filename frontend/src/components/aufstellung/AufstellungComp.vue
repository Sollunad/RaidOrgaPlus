<template>
    <div class="aufstellung">
        <AufstellungHeaderComp
            v-bind:aufstellung="aufstellung"
            v-bind:role="role"
            v-bind:active="active"
            v-bind:success="success"
            v-on:deleteBoss="deleteBoss"
            v-on:toggleSuccess="toggleSuccess">
        </AufstellungHeaderComp>
        <AufstellungBodyComp
                v-bind:aufstellung="aufstellung"
                v-bind:raid="raid"
                v-bind:active="active"
                v-bind:propElements="elements">
        </AufstellungBodyComp>
    </div>
</template>

<script>
    import AufstellungHeaderComp from "./AufstellungHeaderComp";
    import AufstellungBodyComp from "./AufstellungBodyComp";
    import aufstellung from '../../services/endpoints/aufstellungen';

    export default {
        name: "AufstellungComp",
        components: {AufstellungBodyComp, AufstellungHeaderComp},
        props: ['aufstellung', 'raid', 'role', 'active', 'elements'],
        data: () => ({
            success: false
        }),
        methods: {
            deleteBoss: function() {
                this.$emit('deleteBoss', this.aufstellung.id);
            },
            toggleSuccess: function() {
                this.success = !this.success;
                aufstellung.setSuccess(this.aufstellung.id, this.success);
            }
        },
        created: async function() {
            if (!this.active) {
                this.success = await aufstellung.getSuccess(this.aufstellung.id);
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