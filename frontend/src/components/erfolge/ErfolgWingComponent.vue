<template>
    <div>
        <div @click="toggleShow">
            <v-avatar size="48">
                <img :src="wingIcon">
            </v-avatar>
            <span :class="textClass">{{done}} / {{totalAchievements}}</span>
            <v-icon class="dropdown-icon">{{ dropdownIcon }}</v-icon>
        </div>
        <v-container grid-list-md v-show="show">
            <v-layout row wrap>
                <v-flex
                        v-for="ach in wing.achievements"
                        :key="ach.id"
                        xs6 sm6 md3>
                    <ErfolgComponent
                            v-bind:achievement="ach"
                            v-bind:allDone="allDone"
                            v-on:countDone="countDone">
                    </ErfolgComponent>
                </v-flex>
            </v-layout>
        </v-container>
        <p></p>
    </div>
</template>

<script>
    import ErfolgComponent from "./ErfolgComponent";
    import _icons from '../../services/icons';

    export default {
        name: "ErfolgWingComponent",
        components: {ErfolgComponent},
        props: ['allDone', 'wing'],
        data: () => ({
            done: 0,
            show: false
        }),
        computed: {
            wingIcon: function() {
                return _icons.wingIcon(this.wing.wing);
            },
            totalAchievements: function() {
                return this.wing.achievements.length;
            },
            complete: function() {
                return this.done === this.totalAchievements;
            },
            textClass: function() {
                return `doneCount ${this.complete? 'success--text': ''}`
            },
            dropdownIcon: function() {
                return this.show? 'keyboard_arrow_up' : 'keyboard_arrow_down';
            }
        },
        methods: {
            countDone: function() {
                this.done++;
            },
            toggleShow: function() {
                this.show = !this.show;
            }
        }
    }
</script>

<style scoped>
    .doneCount {
        margin-left: 10px;
    }

    .dropdown-icon {
        float: right;
        margin-top: 10px;
    }
</style>