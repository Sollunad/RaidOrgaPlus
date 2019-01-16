<template>
    <v-layout row>
        <v-flex xs12 sm3>
            <v-card>
                <v-list>
                    <v-list-tile
                            v-for="item in items"
                            :key="item.title"
                            avatar
                            :to="item.route"
                    >
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title v-text="item.title"></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "RaidDashboardPage",
        props: ['raid'],
        data () {
            return {
                items: [
                    { title: 'Spielerliste', route: '/raid/spielerliste', icon: 'people' },
                    { title: 'Termine', route: '/raid/termine', icon: 'calendar_today'},
                    { title: 'Archiv', route: '/raid/archiv', icon: 'book' },
                    //{ title: 'Statistiken', route: '/raid/statistiken', icon: 'show_chart' },
                ]
            }
        }
    }
</script>

<style scoped>

</style>