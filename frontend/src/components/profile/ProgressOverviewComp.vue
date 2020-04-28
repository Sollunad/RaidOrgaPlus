<template>
    <v-tabs
            class="elevation-6"
            background-color="#212121"
            color="white"
            show-arrows>
        <v-tabs-slider color="info"></v-tabs-slider>
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
                eager
        >
            <component
                    :is="comp"
                    v-bind:user="user"
                    v-bind:ownProfile="ownProfile"
            >
            </component>
        </v-tab-item>
    </v-tabs>
</template>

<script>
    import ProgressComp from "./ProgressComp";
    import InsightsComp from "./InsightsComp";
    import ErfolgeComp from "../erfolge/ErfolgeComp";

    export default {
        name: "ProgressOverviewComp",
        props: ['user', 'ownProfile'],
        data: () => ({
            progressCompNames: ["Weekly Progress", "Trophäen", 'Erfolge'],
            progressComps: [ProgressComp, InsightsComp, ErfolgeComp],
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