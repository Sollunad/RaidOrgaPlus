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
                    release: 'März 2019',
                    features: [
                        'Live-Aufstellungen',
                        'Lieutenants ernennen',
                        'Logs hochladen und anzeigen',
                        'Builds in Spielerliste filtern',
                        'Dropdowns nach Builds gefiltert',
                        'Fortlaufende Termine',
                        'Raid-Drops',
                        'Erfolgsliste',
                    ]},
                {
                    no: '1.2',
                    release: 'April 2019',
                    features: [
                        'Videos verlinken',
                        'Eigene Skillcard',
                        'Öffentliche Profile',
                        'Profilbilder',
                        'Statistiken',
                        'Kill Proofs',
                        'Termine exportieren in Kalender',
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