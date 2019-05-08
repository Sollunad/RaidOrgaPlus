<template>
    <div class="blanko">
        <BlankoHeaderComp
                v-bind:boss="boss"
                v-bind:role="role"
                v-on:copyBlanko="copyBlanko"></BlankoHeaderComp>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex
                        v-for="i in 10"
                        :key="i"
                        xs6>
                    <BlankoElementComp
                            v-bind:position="i"
                            v-bind:raid="raid"
                            v-bind:boss="boss"
                            v-bind:propElement="propElement(i)"
                            v-bind:role="role">
                    </BlankoElementComp>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import BlankoElementComp from "./BlankoElementComp";
    import BlankoHeaderComp from "./BlankoHeaderComp";

    export default {
        name: "BlankoComp",
        components: {BlankoHeaderComp, BlankoElementComp},
        props: ['raid', 'boss', 'elements', 'role'],
        computed: {
            blankoElements: function() {
                if (this.boss && this.elements) {
                    return this.elements.filter(e => e.enc === this.boss.id);
                } else {
                    return [];
                }
            }
        },
        methods: {
            propElement: function(position) {
                if (this.blankoElements) {
                    return this.blankoElements.filter(e => e.pos === position)[0];
                }
            },
            copyBlanko: function(info) {
                this.$emit('copyBlanko', info);
            }
        }
    }
</script>

<style scoped>
    .blanko {
        background-color: #222222;
        width: 100%;
        height: 100%;
        box-shadow: 1px 1px 3px black;
    }
</style>