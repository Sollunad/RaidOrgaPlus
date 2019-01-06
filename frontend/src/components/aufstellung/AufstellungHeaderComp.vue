<template>
    <div v-if="encounter" class="header">
        <v-avatar class="avatar">
            <img :src="icon()">
        </v-avatar>
        <span>{{encounter.name}}</span>
        <v-btn flat icon color="red" @click="deleteBoss">
            <v-icon>clear</v-icon>
        </v-btn>
    </div>
</template>

<script>
    import icons from '../../services/icons.js';
    import encounter from '../../services/encounter';

    export default {
        name: "AufstellungHeaderComp",
        props: ['aufstellungId'],
        asyncComputed:{
            encounter: function() {
                return encounter.getForAufstellung(this.aufstellungId);
            },
        },
        methods: {
            icon: function() {
                if (this.encounter) return icons.encIcon(this.encounter.abbr);
                else return '';
            },
            deleteBoss: function() {
                this.$emit('deleteBoss');
            }
        }
    }
</script>

<style scoped>
    .avatar {
        margin-right: 1rem;
    }

    .header {
        font-size: 20px;
        font-weight: bold;
        width: fit-content;
        padding: 0.5rem 1rem;
    }

    .button {
        float: right;
    }
</style>