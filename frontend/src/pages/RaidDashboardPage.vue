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
                    { title: 'Termine', route: '/raid/termine' },
                    { title: 'Archiv', route: '/raid/archiv' },
                ]
            }
        }
    }
</script>

<style scoped>

</style>