<template>
    <div class="wing"
        v-bind:class="{'colored-wing': isBuffWing}">
        <v-avatar :size="48" tile class="cotm" v-if="showCotmIcons">
            <img v-if="isBuffWing" :src="icon()">
        </v-avatar>
        <ProgressBossComp
                class="boss"
                v-for="boss in bosses"
                v-bind:boss="boss"
                v-bind:progress="progress"
                :key="boss.name">
        </ProgressBossComp>
    </div>
</template>

<script>
    import ProgressBossComp from "./ProgressBossComp";
    import _icons from '../../services/icons';

    export default {
        name: "ProgressWingComp",
        components: {ProgressBossComp},
        props: ['bosses', 'progress', 'wing', 'maxWing', 'width'],
        methods: {
            icon: function() {
                return _icons.miscIcon('cotm');
            }
        },
        computed: {
            isBuffWing: function() {
                return this.isLastWing || this.isRotationWing;
            },
            isLastWing: function() {
                return this.wing === this.maxWing;
            },
            isRotationWing: function() {
                const timeReference = new Date('2019-01-21T00:00:10');
                const difference = new Date() - timeReference;
                const rotations = Math.floor(difference / (1000*60*60*24*7*2));
                const rotationWing = rotations % (this.maxWing - 1) + 1;
                return this.wing === rotationWing;
            },
            showCotmIcons: function() {
                return this.width > 460;
            },
        }
    }
</script>

<style scoped>
    .wing {
        border-radius: 15px;
        margin: 5px 0;
    }

    @media only screen and (min-width: 600px) {
        .wing {
            padding: 0 10px;
        }
    }

    .colored-wing {
        background-color: #445570;
        box-shadow: 1px 1px 6px black;
    }

    .cotm {
        float: left;
        margin-right: 16px;
        padding-top: 16px;
    }

    .boss {
        margin: 5px;
    }
</style>