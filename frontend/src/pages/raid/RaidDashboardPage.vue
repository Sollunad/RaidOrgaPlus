<template>
    <v-layout row>
        <v-flex xs12 sm3>
            <v-card>
                <v-list>
                    <v-list-tile
                            v-for="item in items"
                            :key="item.id"
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
                    { id: 1, title: 'Spielerliste', route: '/raid/spielerliste', icon: 'people' },
                    { id: 2, title: 'Termine', route: '/raid/termine', icon: 'calendar_today'},
                    { id: 3, title: 'Archiv', route: '/raid/archiv', icon: 'book' },
                    { id: 4, title: 'Blankos', route: '/raid/blankos', icon: 'border_clear' },
                    //{ id: 5, title: 'Statistiken', route: '/raid/statistiken', icon: 'show_chart' },
                ]
            }
        }
    }
</script>

<style scoped>

</style>