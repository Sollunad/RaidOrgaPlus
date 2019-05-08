<template>
    <div class="changelog">
        <v-expansion-panel>
            <v-expansion-panel-content
                    v-for="(version, index) in versions"
                    :key="index"
            >
                <div slot="header">v{{ version.no }} - {{ version.release }}</div>
                <v-card color="blue-grey darken-2">
                    <v-card-text>
                        <ul>
                            <li v-for="feature in version.features" :key="feature">
                                {{ feature }}
                            </li>
                        </ul>
                        <v-expansion-panel>
                            <v-expansion-panel-content
                                    v-for="(subversion, index) in version.subversions"
                                    :key="index"
                            >
                                <div slot="header">v{{ subversion.no }} - {{ subversion.release }}</div>
                                <v-card color="blue-grey darken-2">
                                    <v-card-text>
                                        <ul>
                                            <li v-for="feature in subversion.features" :key="feature">
                                                {{ feature }}
                                            </li>
                                        </ul>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script>
    export default {
        name: "ChangelogComp",
        data: () => ({
            versions: [
                {
                    no: '1.0',
                    release: '26.02.2019',
                    features: [
                        'Spielerliste',
                        'Termine / Archiv',
                        'Blankos',
                        'Meine Builds',
                        'Weekly Progress',
                        'LI / LD',
                    ],
                    subversions: [

                    ]},
                {
                    no: '1.1',
                    release: '08.05.2019',
                    features: [
                        'Builds in Spielerliste nach Rollen filtern',
                        'Erfolgs-Übersicht',
                        'Raidleiter in Spielerliste zuerst anzeigen',
                        'Kennzeichnen von fehlenden Anmeldungen in Liste',
                        'Namen von einem Boss zum anderen kopieren',
                        'Buff-Wings hervorheben',
                        'Visual Overhaul der Aufstellungen'

                    ]},
                {
                    no: '1.2',
                    release: 'Coming soon',
                    features: [
                        'Logs hochladen und anzeigen',
                        'CMs markieren',
                        'Fortlaufende Termine',
                        'Statistiken',
                        'Nutzerprofile'
                    ]},
            ],
        })
    }
</script>

<style scoped>
    .changelog {
        background-color: #444444;
    }
</style>