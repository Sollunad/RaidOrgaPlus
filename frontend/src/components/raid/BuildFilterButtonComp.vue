<template>
    <span>
        <v-btn fab small class="button" @click="click()" :color="color">
            <img :src="roleIcon(role)" width="20">
        </v-btn>
    </span>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _icons from '../../services/icons';

    export default Vue.extend({
        name: "BuildFilterButton",
        props: ['role', 'picked'],
        computed: {
            color: function(): string {
                return this.picked? 'success' : '';
            }
        },
        methods: {
            click: function(): void {
                this.$emit('click', this.role);
            },
            roleIcon: function(role: any): string {
                return _icons.roleIcon(role);
            },
        }
    })
</script>

<style scoped>

</style>