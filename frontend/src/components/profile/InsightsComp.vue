<template>
    <div class="insights" v-if="ownProfile || insights">
        <div class="headline">
            Legendäre Trophäen
        </div>
        <p></p>
        <v-progress-circular
                v-if="insights.length === 0"
                indeterminate
                color="primary"
        ></v-progress-circular>
        <div v-for="type in insights"
            v-bind:key="type.name">
            <v-avatar :size="40" tile class="typeicon">
                <img :src="icon(type.name)">
            </v-avatar>
            <v-avatar :size="30" tile class="useicon">
                <img :src="icon('inv')">
            </v-avatar>
            <span>{{type.hand}}</span>
            <v-avatar :size="30" tile class="useicon">
                <img :src="icon('craft')">
            </v-avatar>
            <span>{{type.crafted}}</span>
            <p></p>
        </div>
    </div>
</template>

<script>
    import _progress from '../../services/endpoints/progress';
    import _icons from '../../services/icons';

    export default {
        name: "InsightsComp",
        props: ['user', 'ownProfile'],
        data: () => ({
            insights: []
        }),
        methods: {
            icon: function(name) {
                return _icons.miscIcon(name);
            }
        },
        created: async function() {
            if (this.ownProfile) this.insights = await _progress.insights();
            else this.insights = await _progress.insights(this.user.id);
        }
    }
</script>

<style scoped>
    .typeicon {
        margin-right: 5px;
        box-shadow: 1px 1px 2px black;
    }
</style>