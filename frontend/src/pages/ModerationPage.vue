<template>
    <div class="moderation" v-if="showContainer">
        <v-tabs
                class="elevation-6"
				background-color="var(--v-tabHeader-base)"
                color="var(--v-textColor-base)"
                show-arrows>
            <v-tabs-slider color="info"></v-tabs-slider>
            <v-tab
                    v-for="name in moderationCompNames"
                    :key="name"
            >
                {{ name }}
            </v-tab>
            <v-tab-item
                    v-for="(comp, i) in moderationComps"
                    :key="i"
                    class="moderationComp"
                    eager
            >
                <component :is="comp"></component>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import ModUserListComp from "../components/moderation/ModUserListComp.vue";
    import ModRaidListComp from "../components/moderation/ModRaidListComp.vue";
	import { UserRole } from "../../../models/Enums";

    export default Vue.extend({
        name: "ModerationPage",
        components: {ModUserListComp},
        data: () => ({
            moderationCompNames: ['Spieler-Verwaltung', 'Raid-Verwaltung'],
            moderationComps: [ModUserListComp, ModRaidListComp],
        }),
        computed: {
            showContainer: function(): boolean {
                return this.$vStore.getters.loggedInUser.role > UserRole.Normal;
            }
        }
    })
</script>

<style scoped>
    .moderationComp {
        padding-top: 10px;
        width: 100%;
    }
</style>