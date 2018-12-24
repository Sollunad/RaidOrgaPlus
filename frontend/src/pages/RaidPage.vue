<template>
    <div>
        <RaidToolbarComp
                v-bind:raid="raid"
                v-bind:role="role"
        >
        </RaidToolbarComp>
        <router-view
                v-bind:raid="raid"
                v-bind:role="role"
        >
        </router-view>
    </div>
</template>

<script>
    import db_raids from '../services/raids.js';
    import RaidToolbarComp from "../components/RaidToolbarComp";

    export default {
        name: "RaidPage",
        components: {RaidToolbarComp},
        props: ['user'],
        computed: {
            raidId: function() {
                return localStorage.raidId;
            }
        },
        asyncComputed: {
            raid: function () {
                return db_raids.give(this.raidId);
            },
            role: function() {
                if (this.user) {
                    return db_raids.role(this.raidId, this.user.id);
                }
            }
        }
    }
</script>

<style scoped>

</style>