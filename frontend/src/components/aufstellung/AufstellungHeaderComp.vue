<template>
    <div v-if="encounter" class="header unselectable">
        <v-avatar class="avatar">
            <img :src="icon()">
        </v-avatar>
        <span>{{encounter.name}}{{isCm? ' CM' : ''}}</span>
        <v-btn flat icon color="red" @click="deleteBoss" class="button" v-if="role > 0 && active">
            <v-icon>clear</v-icon>
        </v-btn>
        <v-btn flat icon :color="successColor" @click="toggleSuccess" class="button" v-if="role > 0 && !active">
            <v-icon>done</v-icon>
        </v-btn>
    </div>
</template>

<script>
    import icons from '../../services/icons.js';
    import aufstellung from '../../services/aufstellung';

    export default {
        name: "AufstellungHeaderComp",
        props: ['aufstellungId', 'role', 'active', 'success'],
        data: () => ({
            isCm: false
        }),
        asyncComputed:{
            encounter: function() {
                return aufstellung.getEncounter(this.aufstellungId);
            },
        },
        computed: {
            successColor: function() {
                if (this.success) return 'green';
                else return 'white';
            }
        },
        methods: {
            icon: function() {
                if (this.encounter) return icons.encIcon(this.encounter.abbr);
                else return '';
            },
            deleteBoss: function() {
                this.$emit('deleteBoss');
            },
            toggleSuccess: function() {
                this.$emit('toggleSuccess');
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
        padding: 0.5rem 1rem;
    }

    .button {
        float: right;
    }

    .unselectable {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
    }
</style>