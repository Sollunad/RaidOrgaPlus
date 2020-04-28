<template>
    <div class="raidPage">
        <RaidToolbarComp
                v-bind:raid="raid"
        >
        </RaidToolbarComp>
        <router-view
                class="raidPageRouter"
                v-bind:raid="raid"
                v-bind:role="role"
                v-bind:termin="termin"
        >
        </router-view>
    </div>
</template>

<script>
    import RaidToolbarComp from "../components/raid/RaidToolbarComp";

    export default {
        name: "RaidPage",
        components: {RaidToolbarComp},
        computed: {
            role: function() {
                if (this.raid) return this.raid.role;
                else return 0;
            },
            raid: function() {
                return this.$store.getters.raid;
            },
            termin: function() {
                return this.$store.getters.termin;
            }
        },
        created: function() {
            if (!this.raid) window.location.href = '/#/raids';
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