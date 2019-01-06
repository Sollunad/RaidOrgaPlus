<template>
    <v-list>
        <v-list-tile
                v-for="(wing, index) in wings"
                :key="index"
                class="unselectable"
        >
            <v-menu>
                <v-list-tile-title slot="activator">Wing {{ wing }}</v-list-tile-title>
                <MenuBossComp
                    v-bind:wing="wing"
                    v-on:pick="pick">
                </MenuBossComp>
            </v-menu>
        </v-list-tile>
    </v-list>
</template>

<script>
    import MenuBossComp from "./MenuBossComp";
    export default {
        name: "MenuWingComp",
        components: {MenuBossComp},
        data: () => ({
            maxWing: 6
        }),
        computed: {
            wings: function() {
                let ret = [];
                for (let i = 1; i <= this.maxWing; i++) {
                    ret.push(i);
                }
                return ret;
            }
        },
        methods: {
            pick: function(info) {
                this.$emit('pick',info);
            }
        }
    }
</script>

<style scoped>
    .unselectable {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
    }
</style>