<template>
    <div>
        <v-list-item @click="openTermin" class="listTermin">
            <v-list-item-content>
                <v-list-item-title v-html="headline"></v-list-item-title>
                <v-list-item-subtitle v-html="subline"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <v-btn icon>
                    <v-icon>{{icon}}</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
    </div>
</template>

<script lang="ts">
	import { MyActions } from '@/models/Store/State';
	import Vue from 'vue';

    export default Vue.extend({
        name: "ListTerminComp",
        props: ['termin'],
        computed: {
            headline: function(): string {
                if (this.termin.no) {
                    return `#${this.termin.no} - ${this.termin.date}`;
                } else {
                    return this.termin.date;
                }
            },
            subline: function(): string {
                if (this.termin.endtime) {
                    return `${this.termin.time} - ${this.termin.endtime}`;
                } else {
                    return this.termin.time;
                }
            },
            icon: function(): string {
                if (this.termin) {
                    if (this.termin.type === null) return 'warning';
                    const icons = ['check_circle', 'check_circle_outline', 'cancel'];
                    return icons[this.termin.type];
                } else {
                    return '';
                }
            }
        },
        methods: {
            openTermin: function() {
                this.$vStore.dispatch(MyActions.OpenTermin, this.termin);
            }
        }
    })
</script>

<style scoped>
    .listTermin {
        margin: 0 10px;
    }
</style>