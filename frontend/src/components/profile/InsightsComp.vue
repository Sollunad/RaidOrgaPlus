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
            <v-avatar :size="26" tile class="useicon-fat">
                <img :src="icon('coffer')">
            </v-avatar>
            <span>{{type.coffer}}</span>
            <p></p>
        </div>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _progress from '../../services/endpoints/progress';
    import _icons from '../../services/icons';

    export default Vue.extend({
        name: "InsightsComp",
        props: ['user', 'ownProfile'],
        data: () => ({
            insights: [] as any[]
        }),
        methods: {
            icon: function(name: any): string {
                return _icons.miscIcon(name);
            }
        },
        created: async function(): Promise<void> {
            if (this.ownProfile) this.insights = await _progress.insights(null);
            else this.insights = await _progress.insights(this.user.id);
        }
    })
</script>

<style scoped>
    .typeicon {
        margin-right: 5px;
        box-shadow: 1px 1px 2px black;
    }

    .useicon {
        margin: 0 3px 0 3px;
    }

    .useicon-fat {
        margin: 0 8px 0 8px;
    }
</style>