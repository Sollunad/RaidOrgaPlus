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
                v-on:saveTermin="saveTermin"
                v-bind:termin="termin"
        >
        </router-view>
    </div>
</template>

<script>
    import _raids from '../services/endpoints/raids.js';
    import RaidToolbarComp from "../components/raid/RaidToolbarComp";

    export default {
        name: "RaidPage",
        components: {RaidToolbarComp},
        props: ['user', 'raidId'],
        asyncComputed: {
            raid: function () {
                if (this.raidId === 0) window.location.href = '/#/raids';
                return _raids.get(this.raidId);
            },
            role: function() {
                if (this.user && this.raid) {
                    return _raids.role(this.raidId, this.user.id);
                }
            }
        },
        data: () => ({
            termin: null
        }),
        methods: {
            saveTermin: function(termin) {
                this.termin = termin;
            }
        }
    }
</script>

<style scoped>

</style>