<template>
    <div v-if="encounter" class="header">
        <v-avatar class="avatar">
            <img :src="icon()">
        </v-avatar>
        {{encounter.name}}
    </div>
</template>

<script>
    import icons from '../services/icons.js';

    export default {
        name: "AufstellungHeaderComp",
        props: ['aufstellungId'],
        asyncComputed:{
            encounter: function() {
                return {name: 'Keep Construct', abbr: 'KC'};
            },
        },
        methods: {
            icon: function() {
                if (this.encounter) return icons.encIcon(this.encounter.abbr);
                else return '';
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
</style>