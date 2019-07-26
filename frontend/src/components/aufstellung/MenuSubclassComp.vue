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
                            :style="{'background-color': backgroundColor(index)}"
                            @click="pick(clss)"
                            @mouseover="enter(index)"
                            @mouseleave="leave()"
                            tile>
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
            },
            backgroundColor: function(index) {
                if (this.isHovered(index)) {
                    return this.darkenColor(this.classes[0].color);
                } else {
                    return '';
                }
            },
            darkenColor: function(color) {
                const rValue = color.slice(1,3);
                const gValue = color.slice(3,5);
                const bValue = color.slice(5,7);
                const colors = [rValue, gValue, bValue];
                const newValue = colors.map(c => Math.floor(parseInt(c, 16) / 2).toString(16)).join('');
                return `#${newValue}`;
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
</style>