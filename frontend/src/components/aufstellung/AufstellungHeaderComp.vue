<template>
    <div>
        <div class="header">
            <v-avatar class="avatar">
                <img :src="icon()">
            </v-avatar>
            <span
                v-bind:style="{color: isCM? '#E91E63': 'var(--v-textColor-base)'}">
                {{aufstellung.name}}{{isCM? ' CM' : ''}}
            </span>
            <v-speed-dial
                    v-model="fab"
                    direction="bottom"
                    class="dial"
                    transition="slide-y-transition"
                    v-if="raidRole > 0 && active && !copyActive"
            >
                <template v-slot:activator>
                    <v-btn
                        v-model="fab"
                        small
                        fab
                    >
                        <v-icon>settings</v-icon>
                    </v-btn>
                </template>
                <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                        <v-btn
                                fab
                                small
                                color="blue"
                                @click="toggleCopy"
                                v-on="on">
                            <v-icon>input</v-icon>
                        </v-btn>
                    </template>
                    Einträge hierher kopieren
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                        <v-btn
                                v-if="aufstellung.has_cm"
                                fab
                                small
                                color="pink"
                                @click="changeCM"
                                v-on="on">
                            <v-icon>new_releases</v-icon>
                        </v-btn>
                    </template>
                    CM umschalten
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                        <v-btn
                                fab
                                small
                                color="red"
                                @click="deleteBoss"
                                v-on="on">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </template>
                    Boss löschen
                </v-tooltip>
            </v-speed-dial>
            <v-btn
                    v-if="copyActive"
                    color="blue"
                    class="dial"
                    small
                    fab>
                <v-icon @click="toggleCopy">arrow_back</v-icon>
            </v-btn>
            <v-btn icon :color="successColor" @click="toggleSuccess" class="button" v-if="!active">
                <v-icon>{{successIcon}}</v-icon>
            </v-btn>
            <v-btn icon class="button" v-if="reportLink" target="_newtab" :href="reportLink">
                <v-icon>show_chart</v-icon>
            </v-btn>
        </div>
        <div>
            <FileUploadComp v-bind:aufstellung="aufstellung" v-if="uploadActive" v-on:uploadComplete="uploadComplete" />
        </div>
    </div>
</template>

<script lang="ts">
	import Vue, { PropType } from 'vue';
    import _icons from '../../services/icons';
    import _aufstellungen from '../../services/endpoints/aufstellungen';
    import FileUploadComp from "../reports/FileUploadComp.vue";
	import { MyActions } from '@/models/Store/State';
	import { Aufstellung } from 'models/Aufstellung';
	import { Encounter } from 'models/Encounter';

    export default Vue.extend({
        name: "AufstellungHeaderComp",
        components: {FileUploadComp},
		props: {
			aufstellung: Object as PropType<Aufstellung & Encounter>,
			copyActive: Boolean
		},
        data: () => ({
            isCM: false,
            showUpload: false,
            reportId: '',
            fab: false,
            success: false,
        }),
        computed: {
            raidRole: function(): number {
                return this.$vStore.getters.raidRole;
            },
            active: function(): any {
                return this.$vStore.getters.isActive;
            },
            uploadActive: function(): boolean {
                return this.$vStore.getters.uploadActive;
            },
            successColor: function(): string {
                if (this.success) return 'green';
                else return 'white';
            },
            successIcon: function(): string {
                if (this.success) return 'check_circle';
                else return 'check_circle_outline';
            },
            reportLink: function(): string | boolean {
				const baseLink = 'https://sv.rising-light.de:8080/reports/';
				if (this.reportId != null) {
					if (this.isURL(this.reportId)) {
						return this.reportId;
					}
					else {
						return `${baseLink}${this.reportId}.html`;
					}
				}

				return false;
            }
        },
        methods: {
            icon: function(): string {
                if (this.aufstellung) return _icons.encIcon(this.aufstellung.abbr);
                else return '';
            },
            deleteBoss: function(): void {
                this.$vStore.dispatch(MyActions.DeleteBoss, this.aufstellung);
            },
            toggleSuccess: async function(): Promise<void> {
                if (this.raidRole > 0) {
                    this.success = !this.success;
                    await _aufstellungen.setSuccess(this.aufstellung.id, this.success);
                }
            },
            uploadComplete: function(newId: string): void {
                this.reportId = newId;
            },
            toggleCopy: function(): void {
                this.$emit('toggleCopy');
            },
            changeCM: async function(): Promise<void> {
                this.isCM = !this.isCM;
                await _aufstellungen.setCM(this.aufstellung.id, this.isCM);
                await this.$vStore.dispatch(MyActions.WsSendRefresh);
            },
			isURL: function(report: string): boolean {
				const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
					'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
					'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
					'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
					'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
					'(\\#[-a-z\\d_]*)?$','i'); // fragment locator

				return pattern.test(report);
			}
        },
        created: function(): void {
            this.reportId = this.aufstellung.report;
            this.success = this.aufstellung.success;
            this.isCM = this.aufstellung.is_cm;
        }
    })
</script>

<style scoped>
    .avatar {
        margin-right: 1rem;
    }

    .header {
        font-size: 20px;
        font-weight: bold;
        padding: 0.5rem 1rem;
        position: relative;
    }

    .dial {
        position: absolute;
        left: 86%;
        top: 18%;
    }

    .button {
        float: right;
        margin-top: 4px;
    }
</style>