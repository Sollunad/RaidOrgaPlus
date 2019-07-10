<template>
    <div class="insights" v-if="ownProfile || insights">
        <div class="headline">
            Legendäre Trophäen
        </div>
        <p></p>
        <v-progress-circular
                v-if="!insights"
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
        asyncComputed: {
            insights: function() {
                if (this.ownProfile) return _progress.insights();
                else return _progress.insights(this.user.id);
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
        box-shadow: 1px 1px 2px black;
    }
</style>