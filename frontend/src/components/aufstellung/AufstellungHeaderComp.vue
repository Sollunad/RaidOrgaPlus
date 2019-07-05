<template>
    <div>
        <div class="header">
            <v-avatar class="avatar">
                <img :src="icon()">
            </v-avatar>
            <span>{{aufstellung.name}}{{isCm? ' CM' : ''}}</span>
            <v-btn flat icon color="red" @click="deleteBoss" class="button" v-if="role > 0 && active">
                <v-icon>clear</v-icon>
            </v-btn>
            <v-menu v-if="role > 0 && active" class="button" :lazy="true">
                <v-tooltip slot="activator" bottom>
                    <v-btn flat icon slot="activator">
                        <v-icon>input</v-icon>
                    </v-btn>
                    <span>Einträge kopieren</span>
                </v-tooltip>
                <MenuAufstellungenComp
                        v-bind:aufstellung="aufstellung"
                        v-bind:all="all"
                        v-on:refresh="refresh"
                ></MenuAufstellungenComp>
            </v-menu>
            <v-btn flat icon :color="successColor" @click="toggleSuccess" class="button" v-if="!active">
                <v-icon>{{successIcon}}</v-icon>
            </v-btn>
            <v-btn flat icon class="button" v-if="reportLink" target="_newtab" :href="reportLink">
                <v-icon>show_chart</v-icon>
            </v-btn>
        </div>
        <div>
            <FileUploadComp
                    v-bind:aufstellung="aufstellung"
                    v-if="uploadActive"
            ></FileUploadComp>
        </div>
    </div>
</template>

<script>
    import _icons from '../../services/icons.js';
    import MenuAufstellungenComp from "./MenuAufstellungenComp";
    import FileUploadComp from "../reports/FileUploadComp";

    export default {
        name: "AufstellungHeaderComp",
        components: {FileUploadComp, MenuAufstellungenComp},
        props: ['aufstellung', 'role', 'active', 'success', 'all', 'uploadActive'],
        data: () => ({
            isCm: false,
            showUpload: false
        }),
        computed: {
            successColor: function() {
                if (this.success) return 'green';
                else return 'white';
            },
            successIcon: function() {
                if (this.success) return 'check_circle';
                else return 'check_circle_outline';
            },
            reportLink: function() {
                const baseLink = 'https://sv.sollunad.de:8080/reports/';
                if (this.aufstellung.report) {
                    return `${baseLink}${this.aufstellung.report}.html`;
                } else {
                    return false;
                }
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
            },
            refresh: function() {
                this.$emit('refresh');
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