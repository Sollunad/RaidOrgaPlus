<template>
    <span>
        <v-btn fab small class="button" @click="click()" :color="color">
            <img :src="roleIcon(role)" width="20">
        </v-btn>
    </span>
</template>

<script>
    import _icons from '../../services/icons';

    export default {
        name: "BuildFilterButton",
        props: ['role', 'picked'],
        computed: {
            color: function() {
                return this.picked? 'success' : '';
            }
        },
        methods: {
            click: function() {
                this.$emit('click', this.role);
            },
            roleIcon: function(role) {
                return _icons.roleIcon(role);
            },
        }
    }
</script>

<style scoped>

</style>