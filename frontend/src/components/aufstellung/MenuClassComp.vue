<template>
    <div>
        <v-container grid-list-sm class="menu">
            <v-layout row wrap>
                <v-flex
                        v-for="(clss, index) in classes"
                        :key="index"
                        xs4>
                    <v-menu :lazy="true">
                        <v-avatar :size="30" class="icon" slot="activator" :tile="true">
                            <img :src="classIcon(clss.abbr)">
                        </v-avatar>
                        <MenuSubclassComp
                            v-bind:base="clss.id"
                            v-on:pick="pick">
                        </MenuSubclassComp>
                    </v-menu>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import icons from '../../services/icons';
    import MenuSubclassComp from "./MenuSubclassComp";

    export default {
        name: "MenuClassComp",
        components: {MenuSubclassComp},
        data: () => ({
            classes: [
                { id: 1, abbr: 'Ele' },
                { id: 2, abbr: 'Mes' },
                { id: 3, abbr: 'Nec' },
                { id: 4, abbr: 'Rgr' },
                { id: 5, abbr: 'Eng' },
                { id: 6, abbr: 'Thf' },
                { id: 7, abbr: 'War' },
                { id: 8, abbr: 'Gdn' },
                { id: 9, abbr: 'Rev' },
            ]
        }),
        methods: {
            classIcon: function(name) {
                return icons.classIcon(name);
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

    .icon {
        margin-right: -1.5rem;
    }
</style>