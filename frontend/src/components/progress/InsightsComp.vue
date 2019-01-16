<template>
    <div>
        <h1>LI / LD</h1>
        <p></p>
        <v-progress-circular
                v-if="!insights"
                indeterminate
                color="primary"
        ></v-progress-circular>
        <template v-for="type in insights">
            <v-avatar :size="40" tile class="typeicon">
                <img :src="icon(type.name)">
            </v-avatar>
            <v-avatar :size="30" tile>
                <img :src="icon('inv')">
            </v-avatar>
            <span>{{type.hand}}</span>
            <v-avatar :size="30" tile>
                <img :src="icon('craft')">
            </v-avatar>
            <span>{{type.crafted}}</span>
            <p></p>
        </template>
    </div>
</template>

<script>
    import _progress from '../../services/endpoints/progress';
    import _icons from '../../services/icons';

    export default {
        name: "InsightsComp",
        props: ['user'],
        asyncComputed: {
            insights: function() {
                if (this.user) return _progress.insights(this.user.id);
            }
        },
        methods: {
            icon: function(name) {
                return _icons.miscIcon(name);
            }
        }
    }
</script>

<style scoped>
    .typeicon {
        margin-right: 5px;
    }
</style>