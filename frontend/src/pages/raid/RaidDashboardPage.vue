<template>
    <v-layout row>
        <v-flex xs12 sm3>
            <v-card>
                <v-list>
                    <v-list-item
                            v-for="item in items"
                            :key="item.id"
                            :to="item.route"
                            class="dashboardLink"
                    >
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "RaidDashboardPage",
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
    .dashboardLink {
        margin: 0 10px;
    }
</style>