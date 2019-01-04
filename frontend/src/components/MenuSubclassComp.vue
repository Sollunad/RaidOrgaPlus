<template>
    <div>
        <v-container grid-list-sm class="menu">
            <v-layout row wrap>
                <v-flex
                        v-for="(clss, index) in classes"
                        :key="index"
                        xs4>
                        <v-avatar :size="30" class="icon" slot="activator" @click="pick(clss.abbr)">
                            <img :src="classIcon(clss.abbr)">
                        </v-avatar>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import icons from '../services/icons';
    import classes from '../services/class';

    export default {
        name: "MenuSubclassComp",
        props: ['base'],
        asyncComputed: {
            classes: async function() {
                return await classes.getForBase(this.base);
            }
        },
        methods: {
            classIcon: function(name) {
                return icons.classIcon(name);
            },
            pick: function(name) {
                this.$emit('pick', name);
            }
        }
    }
</script>

<style scoped>
    .menu {
        background-color: #444444;
    }
</style>