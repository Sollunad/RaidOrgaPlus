<template>
    <div class="changelog">
        <v-expansion-panels>
            <v-expansion-panel
                    v-for="(version, index) in versions"
                    :key="index"
            >
                <v-expansion-panel-header>v{{ version.no }} - {{ version.release }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-card color="blue-grey darken-2">
                        <v-card-text>
                            <ul>
                                <li v-for="feature in version.features" :key="feature">
                                    {{ feature }}
                                </li>
                            </ul>
                            <p v-if="version.subversions"></p>
                            <v-expansion-panels>
                                <v-expansion-panel
                                        v-for="(subversion, index) in version.subversions"
                                        :key="index"
                                >
                                    <v-expansion-panel-header>v{{ subversion.no }} - {{ subversion.release }}</v-expansion-panel-header>
                                    <v-expansion-panel-content>
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
                            </v-expansion-panels>
                        </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
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
                    ]
                },
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

                    ],
                    subversions: [
                        {
                            no: '1.1.1',
                            release: '05.07.2019',
                            features: [
                                'Logs hochladen und anzeigen'

                            ]
                        }
                    ]
                },
                {
                    no: '1.2',
                    release: '11.07.2019',
                    features: [
                        'Nutzerprofile',
                        'Discord-Integration',
                        'Übersicht über kommende Termine'
                    ],
                    subversions: [
                        {
                            no: '1.2.1',
                            release: '26.07.2019',
                            features: [
                                'Homepage und Profile redesigned',
                                'Erfolge sind jetzt im Profil',
                                'Kleinere visuelle Verbesserungen',
                                'Reports beinhalten jetzt ein Combat Replay'
                            ]
                        },
                    ]
                },
                {
                    no: '2.0',
                    release: '31.08.2019',
                    features: [
                        'Open Beta!',
                        'Update auf Vuetify 2.0 - UI-Änderungen',
                        'CMs markieren',
                        'Besser Navigation innerhalb von Raids',
                        'Einteilung des Archivs in Seiten',
                        'Fortlaufende Termine erstellen'
                    ],
                    subversions: [
                        {
                            no: '2.0.1',
                            release: '26.12.2019',
                            features: [
                                'Live-Aufstellungen',
                                'Legendäre Trophäen aus Coffern werden mitgezählt',
                                'Anmeldungen visuell überarbeitet'
                            ]
                        },
                    ]
                },
            ],
        })
    }
</script>

<style scoped>
    .changelog {
        background-color: #444444;
    }
</style>