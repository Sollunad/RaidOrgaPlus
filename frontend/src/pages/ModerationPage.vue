<template>
    <div class="moderation" v-if="user.role > 0">
        <v-tabs
                class="elevation-6"
                background-color="#212121"
                color="white"
                show-arrows>
            <v-tabs-slider color="info"></v-tabs-slider>
            <v-tab
                    v-for="name in moderationCompNames"
                    :key="name"
            >
                {{ name }}
            </v-tab>
            <v-tab-item
                    v-for="comp in moderationComps"
                    :key="comp.name"
                    class="moderationComp"
                    eager
            >
                <component :is="comp"></component>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import ModUserListComp from "../components/moderation/ModUserListComp";
    import ModRaidListComp from "../components/moderation/ModRaidListComp";

    export default {
        name: "ModerationPage",
        components: {ModUserListComp},
        props: ['user'],
        data: () => ({
            moderationCompNames: ['Spieler-Verwaltung', 'Raid-Verwaltung'],
            moderationComps: [ModUserListComp, ModRaidListComp],
        })
    }
</script>

<style scoped>
    .moderationComp {
        padding-top: 10px;
        background-color: #313131;
        width: 100%;
    }
</style>