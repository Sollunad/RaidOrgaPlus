<template>
    <div class="header">
        <v-avatar class="avatar">
            <img :src="icon()">
        </v-avatar>
        <span>{{aufstellung.name}}{{isCm? ' CM' : ''}}</span>
        <v-btn flat icon color="red" @click="deleteBoss" class="button" v-if="role > 0 && active">
            <v-icon>clear</v-icon>
        </v-btn>
        <v-btn flat icon :color="successColor" @click="toggleSuccess" class="button" v-if="!active">
            <v-icon>{{successIcon}}</v-icon>
        </v-btn>
    </div>
</template>

<script>
    import _icons from '../../services/icons.js';

    export default {
        name: "AufstellungHeaderComp",
        props: ['aufstellung', 'role', 'active', 'success'],
        data: () => ({
            isCm: false
        }),
        computed: {
            successColor: function() {
                if (this.success) return 'green';
                else return 'white';
            },
            successIcon: function() {
                if (this.success) return 'check_circle';
                else return 'check_circle_outline';
            }
        },
        methods: {
            icon: function() {
                if (this.aufstellung) return _icons.encIcon(this.aufstellung.abbr);
                else return '';
            },
            deleteBoss: function() {
                this.$emit('deleteBoss');
            },
            toggleSuccess: function() {
                if (this.role > 0) {
                    this.$emit('toggleSuccess');
                }
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
</style>