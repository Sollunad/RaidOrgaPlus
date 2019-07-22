<template>
    <div class="moderation" v-if="user.role > 0">
        <v-tabs
                class="elevation-6"
                color="#212121"
                show-arrows>
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
            >
                <component :is="comp"></component>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import ModUserListComp from "../components/moderation/ModUserListComp";

    export default {
        name: "ModerationPage",
        components: {ModUserListComp},
        props: ['user'],
        data: () => ({
            moderationCompNames: ['Spieler-Verwaltung'],
            moderationComps: [ModUserListComp],
        })
    }
</script>

<style scoped>
    .moderationComp {
        padding: 10px 0;
        background-color: #313131;
        width: 100%;
    }
</style>