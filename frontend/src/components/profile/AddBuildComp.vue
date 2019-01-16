<template>
    <div class="container">
        <v-container>
            <v-layout row wrap>
                <v-flex xs6>
                    <MenuClassComp class="menu"
                        v-on:pick="pickClass"></MenuClassComp>
                </v-flex>
                <v-flex xs6>
                    <MenuRoleComp class="menu"
                        v-on:pick="pickRole"></MenuRoleComp>
                </v-flex>
            </v-layout>
        </v-container>
        <div class="chip">
            <BuildChipComp
                v-bind:clss="clss"
                v-bind:role="role">
            </BuildChipComp>
            <v-btn color="green" fab small @click="addBuild">
                <v-icon>add</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
    import MenuClassComp from "../aufstellung/MenuClassComp";
    import MenuRoleComp from "../aufstellung/MenuRoleComp";
    import BuildChipComp from "./BuildChipComp";

    export default {
        name: "AddBuildComp",
        data: () => ({
           clss: null,
           role: null
        }),
        components: {BuildChipComp, MenuRoleComp, MenuClassComp},
        methods: {
            pickClass: function(clss) {
                this.clss = clss;
            },
            pickRole: function(role) {
                this.role = role;
            },
            addBuild: function() {
                this.$emit('add', {clss: this.clss, role: this.role});
                this.clss = null;
                this.role = null;
            }
        }
    }
</script>

<style scoped>
    .container {
        background-color: #444444;
        padding: 0;
    }

    .menu {
        width: fit-content;
    }

    .chip {
        margin-left: 10px;
    }
</style>