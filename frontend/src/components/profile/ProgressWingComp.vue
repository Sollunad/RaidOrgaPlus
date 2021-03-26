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

<script lang="ts">
	import Vue from 'vue';
    import ProgressBossComp from "./ProgressBossComp.vue";
    import _icons from '../../services/icons';

    export default Vue.extend({
        name: "ProgressWingComp",
        components: {ProgressBossComp},
        props: ['bosses', 'progress', 'wing', 'maxWing'],
        methods: {
            icon: function(): string {
                return _icons.miscIcon('cotm');
            }
        },
        computed: {
            isBuffWing: function(): boolean {
                return this.isLastWing || this.isRotationWing;
            },
            isLastWing: function(): boolean {
                return this.wing === this.maxWing;
            },
            isRotationWing: function(): boolean {
                const timeReference = Number(new Date('2019-01-21T00:00:10'));
                const difference = Number(new Date()) - timeReference;
                const rotations = Math.floor(difference / (1000*60*60*24*7*2));
                const rotationWing = rotations % (this.maxWing - 1) + 1;
                return this.wing === rotationWing;
            },
            showCotmIcons: function(): boolean {
                return this.$vStore.getters.windowWidth > 460;
            },
        }
    })
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