<template>
    <v-list>
        <v-list-item
                v-for="(boss, index) in bosses"
                :key="index"
                @click="pick(boss.id, boss.wing)">
            <v-list-item-title>{{ boss.name }}</v-list-item-title>
        </v-list-item>
    </v-list>
</template>

<script lang="ts">
	import Vue, { PropType } from 'vue';

    export default Vue.extend({
        name: "MenuBossComp",
		props: {
			wing: Object as PropType<any>,
			showFC: Object as PropType<any>
		},
        computed: {
            bosses: function(): any {
                if (this.showFC) {
                    const fc = [{id:0, name:'Full Clear', wing: this.wing[0].wing}];
                    return fc.concat(this.wing);
                }
                else {
                    return this.wing;
                }
            }
        },
        methods: {
            pick: function(id: any, wing: any) {
                this.$emit('pick', [id, wing]);
            }
        }
    })
</script>

<style scoped>

</style>