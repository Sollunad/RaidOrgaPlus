<template>
    <v-app-bar app clipped-left color="#212121" style="z-index: 10000">
        <v-btn icon
               v-if="loggedIn"
               @click.stop="$emit('toggleMenu')">
            <v-icon>menu</v-icon>
        </v-btn>
        <v-toolbar-title>RaidOrga+</v-toolbar-title>
        <v-spacer></v-spacer>
        <span v-if="loggedIn">
            <v-btn icon @click="showBuildCheck = !showBuildCheck">
                <v-icon>{{buildCheckIcon}}</v-icon>
            </v-btn>
            <div class="buildCheckWarning" v-if="showWarning">
                <v-card class="mx-auto" max-width="344" outlined>
                    <v-card-text v-if="!buildCheckSuccess" class="white--text">
                        <p class="headline mb-7 font-weight-bold">Neue Version verfügbar!</p>
                        <p>Deine Version: <span class="red--text">{{frontendBuild}}</span></p>
                        <p>Aktuelle Version: <span class="green--text">{{backendBuild}}</span></p>
                        <span>Refreshe deinen Browser oder klicke hier, um die neueste Version zu erhalten:</span>
                    </v-card-text>
                    <v-card-text v-else class="white--text">
                        <p class="headline mb-5 font-weight-bold">Aktuelle Version installiert!</p>
                        <p>An dieser Stelle erfährst du, sobald es eine neue Version von RaidOrga+ gibt.</p>
                        <span>Aktuelle Version: <span class="green--text">{{frontendBuild}}</span></span>
                    </v-card-text>

                    <v-card-actions v-if="!buildCheckSuccess">
                        <v-btn text @click="refreshPage">Seite neu laden</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
            <v-btn icon @click="logout">
                <v-icon>logout</v-icon>
            </v-btn>
        </span>
    </v-app-bar>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _users from '../../services/endpoints/users';
    import _cookies from '../../services/util/cookies';

    export default Vue.extend({
        name: "MenuToolbarComp",
        props: ['loggedIn'],
        data: () => ({
            showBuildCheck: false,
        }),
        computed: {
            buildCheckSuccess: function(): any {
                return this.$store.getters.buildCheck;
            },
            buildCheckIcon: function(): string {
                return this.buildCheckSuccess? 'verified_user' : 'update';
            },
            showWarning: function(): boolean {
                return this.showBuildCheck || !this.buildCheckSuccess;
            },
            frontendBuild: function(): any {
                return this.$store.getters.frontendBuild;
            },
            backendBuild: function(): any {
                return this.$store.getters.backendBuild;
            }
        },
        methods: {
            logout: async function(): Promise<void> {
                await _users.invalidateSession();
                _cookies.deleteCookie('session');
                window.location.reload();
            },
            refreshPage: function(): void {
                window.location.reload();
            }
        }
    })
</script>

<style scoped>
    .buildCheckWarning {
        top: 60px;
        right: 20px;
        position: absolute;
    }
</style>