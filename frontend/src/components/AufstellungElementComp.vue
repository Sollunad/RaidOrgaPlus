<template>
    <div v-if="element">
        <v-avatar :size="20" :tile="true" class="avatar">
            <img :src="classIcon()">
        </v-avatar>
        <v-avatar :size="20" :tile="true" class="avatar">
            <img :src="roleIcon()">
        </v-avatar>
        {{element.name}}
    </div>
</template>

<script>
    import icons from '../services/icons.js';

    export default {
        name: "AufstellungElementComp",
        props: ['aufstellungId', 'position'],
        asyncComputed: {
            element: function() {
                return {class: "Hls", role: "P", name: "Daniel"};
            }
        },
        methods: {
            classIcon: function() {
                if (this.element) return icons.classIcon(this.element.class);
                else return '';
            },
            roleIcon: function() {
                if (this.element) return icons.roleIcon(this.element.role);
                else return '';
            }
        }
    }
</script>

<style scoped>
    .avatar {
        margin: 0 0.1rem;
    }
</style>