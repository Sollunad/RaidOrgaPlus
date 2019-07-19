<template>
    <v-tabs fixed-tabs
            color="#212121">
        <v-tab
                v-for="name in progressCompNames"
                :key="name"
        >
            {{ name }}
        </v-tab>
        <v-tab-item
                v-for="comp in progressComps"
                :key="comp.name"
                class="progressComp"
        >
            <component
                    :is="comp"
                    v-bind:user="user"
                    v-bind:ownProfile="ownProfile"
                    v-bind:width="width"
            >
            </component>
        </v-tab-item>
    </v-tabs>
</template>

<script>
    import ProgressComp from "./ProgressComp";
    import InsightsComp from "./InsightsComp";

    export default {
        name: "ProgressOverviewComp",
        props: ['user', 'ownProfile', 'width'],
        data: () => ({
            progressCompNames: ["Weekly Progress", "Legendäre Trophäen"],
            progressComps: [ProgressComp, InsightsComp],
        })

    }
</script>

<style scoped>
    .progressComp {
        padding: 10px 20px;
        background-color: #424242;
        width: 100%;
    }
</style>