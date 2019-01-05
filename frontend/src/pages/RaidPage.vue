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
                v-bind:user="user"
                v-on:saveTerminId="saveTerminId"
                v-bind:terminId="terminId"
        >
        </router-view>
    </div>
</template>

<script>
    import db_raids from '../services/raids.js';
    import RaidToolbarComp from "../components/raid/RaidToolbarComp";

    export default {
        name: "RaidPage",
        components: {RaidToolbarComp},
        props: ['user', 'raidId'],
        asyncComputed: {
            raid: function () {
                if (this.raidId === 0) window.location.href = '/#/raids';
                return db_raids.give(this.raidId);
            },
            role: function() {
                if (this.user && this.raid) {
                    return db_raids.role(this.raidId, this.user.id);
                }
            }
        },
        data: () => ({
            terminId: 0
        }),
        methods: {
            saveTerminId: function(id) {
                this.terminId = id;
            }
        }
    }
</script>

<style scoped>

</style>