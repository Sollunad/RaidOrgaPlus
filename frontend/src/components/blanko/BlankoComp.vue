<template>
    <div class="blanko">
        <div class="header">
            <v-avatar class="avatar">
                <img :src="icon()">
            </v-avatar>
            <span>{{boss.name}}</span>
        </div>
        <div class="body">
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

    </div>
</template>

<script>
    import BlankoElementComp from "./BlankoElementComp";
    import _icons from '../../services/icons.js';

    export default {
        name: "BlankoComp",
        components: {BlankoElementComp},
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
            icon: function() {
                if (this.boss) return _icons.encIcon(this.boss.abbr);
                else return '';
            },
            propElement: function(position) {
                if (this.blankoElements) {
                    return this.blankoElements.filter(e => e.pos === position)[0];
                }
            }
        }
    }
</script>

<style scoped>
    .blanko {
        background-color: #222222;
        width: 100%;
        height: 100%;
    }

    .avatar {
        margin-right: 1rem;
    }

    .header {
        font-size: 20px;
        font-weight: bold;
        padding: 0.5rem 1rem;
    }

    .button {
        float: right;
    }
</style>