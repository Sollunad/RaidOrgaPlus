<template>
    <div class="raidPage">
        <RaidToolbarComp/>
        <router-view
                class="raidPageRouter">
        </router-view>
    </div>
</template>

<script>
    import RaidToolbarComp from "../components/raid/RaidToolbarComp";

    export default {
        name: "RaidPage",
        components: {RaidToolbarComp},
        created: function() {
            if (!this.$store.getters.raid) window.location.href = '/#/raids';
        }
    }
</script>

<style scoped>
    @media only screen and (min-width: 600px) {
        .raidPage {
            margin: 0;
        }

        .raidPageRouter {
            margin: 1%;
        }
    }
</style>