<template>
    <div class="wing">
        <ProgressBossComp
                v-for="boss in bosses"
                v-bind:boss="boss"
                v-bind:progress="progress"
                :key="boss.name">
        </ProgressBossComp>
        <v-avatar :size="48" tile class="cotm">
            <img :src="icon()" v-if="isBuffWing">
        </v-avatar>
    </div>
</template>

<script>
    import ProgressBossComp from "./ProgressBossComp";
    import _icons from '../../services/icons';

    export default {
        name: "ProgressWingComp",
        components: {ProgressBossComp},
        props: ['bosses', 'progress', 'wing', 'maxWing'],
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
                const rotationWing = rotations % 5 + 1;
                return this.wing === rotationWing;
            }
        }
    }
</script>

<style scoped>
    .wing {
        border-radius: 15px;
        padding: 0 10px;
        margin: 10px 0;
    }

    .cotm {
        float: right;
        margin-left: 16px;
        padding-top: 18px;
    }
</style>