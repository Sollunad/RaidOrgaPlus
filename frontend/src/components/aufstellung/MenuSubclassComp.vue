<template>
    <div>
        <v-container grid-list-sm class="menu">
            <v-layout row wrap>
                <v-flex
                        v-for="(clss, index) in classes"
                        :key="index"
                        xs4>
                        <v-avatar
                            :size="30"
                            :class="{'hovered-icon': isHovered(index)}"
                            slot="activator"
                            @click="pick(clss)"
                            @mouseover="enter(index)"
                            @mouseleave="leave()"
                            :tile="true">
                            <img :src="classIcon(clss.abbr)">
                        </v-avatar>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import _icons from '../../services/icons';
    import _gamedata from '../../services/endpoints/gamedata';

    export default {
        name: "MenuSubclassComp",
        props: ['base'],
        data: () => ({
            hovered: null,
            classes: []
        }),
        methods: {
            classIcon: function(name) {
                return _icons.classIcon(name);
            },
            pick: function(clss) {
                this.$emit('pick', clss);
            },
            enter: function(index) {
                this.hovered = index;
            },
            leave: function() {
                this.hovered = null;
            },
            isHovered: function(index) {
                return this.hovered === index;
            }
        },
        created: async function() {
            this.classes = await _gamedata.getClassesForBase(this.base);
        }
    }
</script>

<style scoped>
    .menu {
        background-color: #444444;
    }

    .hovered-icon {
        background-color: #666666;
    }
</style>