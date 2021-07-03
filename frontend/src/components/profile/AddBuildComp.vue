<template>
    <div class="container">
        <v-container>
            <v-layout>
                <v-flex xs6>
                    <MenuClassComp
                        v-on:pick="pickClass"></MenuClassComp>
                </v-flex>
                <v-flex xs6>
                    <MenuRoleComp
                        v-on:pick="pickRole"></MenuRoleComp>
                </v-flex>
            </v-layout>
        </v-container>
        <div class="chip">
            <BuildChipComp
                v-bind:build="build">
            </BuildChipComp>
            <v-btn color="green" fab small @click="addBuild">
                <v-icon>add</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import MenuClassComp from "../aufstellung/MenuClassComp.vue";
    import MenuRoleComp from "../aufstellung/MenuRoleComp.vue";
    import BuildChipComp from "./BuildChipComp.vue";

    export default Vue.extend({
        name: "AddBuildComp",
        data: () => ({
           build: {
               class: null as any,
               role: null as any
           }
        }),
        components: {BuildChipComp, MenuRoleComp, MenuClassComp},
        methods: {
            pickClass: function(clss: any): void {
                this.build.class = clss;
            },
            pickRole: function(role: any): void {
                this.build.role = role;
            },
            addBuild: function(): void {
                this.$emit('add', {class: this.build.class, role: this.build.role});
                this.build.class = null;
                this.build.role = null;
            }
        }
    })
</script>

<style scoped>
    .container {
        background-color: var(--v-dialogBox-base);
        padding: 0 0 10px 0;
    }

    .chip {
        margin-left: 10px;
        margin-right: 5px;
    }
</style>
