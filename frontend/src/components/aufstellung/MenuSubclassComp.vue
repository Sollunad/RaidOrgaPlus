<template>
    <div>
        <v-container grid-list-sm class="menu">
            <v-layout row wrap>
                <v-flex
                        v-for="(clss, index) in classes"
                        :key="index"
                        xs4>
                        <v-avatar :size="30" class="icon" slot="activator" @click="pick(clss)" :tile="true">
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
        asyncComputed: {
            classes: async function() {
                return await _gamedata.getClassesForBase(this.base);
            }
        },
        methods: {
            classIcon: function(name) {
                return _icons.classIcon(name);
            },
            pick: function(clss) {
                this.$emit('pick', clss);
            }
        }
    }
</script>

<style scoped>
    .menu {
        background-color: #444444;
    }
</style>