<template>
    <v-layout>
        <v-flex>
            <v-sheet height="500">
                <v-calendar
                        :now="today"
                        :value="today"
                        color="primary"
                        :weekdays="[1, 2, 3, 4, 5, 6, 0]"
                        :short-months="false"
                        :short-weekdays="false"
                >
                    <template v-slot:day="{ date }">
                        <template v-for="event in eventsMap[date]">
                            <v-menu
                                    :key="event.title"
                                    v-model="event.open"
                                    full-width
                                    offset-x
                            >
                                <template v-slot:activator="{ on }">
                                    <div
                                            v-if="!event.time"
                                            v-ripple
                                            class="my-event"
                                            v-on="on"
                                            v-html="event.title"
                                    ></div>
                                </template>
                                <v-card
                                        color="grey lighten-4"
                                        min-width="350px"
                                        flat
                                >
                                    <v-toolbar
                                            color="primary"
                                            dark
                                    >
                                        <v-toolbar-title v-html="event.title"></v-toolbar-title>
                                    </v-toolbar>
                                    <v-card-title primary-title>
                                        <span v-html="event.details"></span>
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-btn
                                                flat
                                                color="secondary"
                                        >
                                            Öffnen
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-menu>
                        </template>
                    </template>
                </v-calendar>
            </v-sheet>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "CalendarComp",
        data: () => ({
            today: '2019-07-07',
            events: [
                {
                    title: 'Vacation',
                    details: 'Going to the beach!',
                    date: '2019-07-30',
                    open: false
                },
                {
                    title: 'Vacation',
                    details: 'Going to the beach!',
                    date: '2019-07-01',
                    open: false
                },
                {
                    title: 'Meeting',
                    details: 'Spending time on how we do not have enough time',
                    date: '2019-07-07',
                    open: false
                },
                {
                    title: '30th Birthday',
                    details: 'Celebrate responsibly',
                    date: '2019-07-03',
                    open: false
                },
                {
                    title: 'Hackathon',
                    details: 'Code like there is no tommorrow',
                    date: '2019-08-01',
                    open: false
                }
            ]
        }),
        computed: {
            // convert the list of events into a map of lists keyed by date
            eventsMap () {
                const map = {};
                this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
                return map
            }
        },
        methods: {
            open (event) {
                alert(event.title)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .my-event {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: 2px;
        background-color: #ffffff;
        color: #1867c0;
        border: 1px solid #ffffff;
        width: 100%;
        font-size: 12px;
        padding: 3px;
        cursor: pointer;
        margin-bottom: 1px;
    }
</style>