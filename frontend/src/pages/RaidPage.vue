<template>
    <div>
        <RaidToolbarComp
                v-bind:raid="raid"
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
    import _raids from '../services/endpoints/raids';
    import RaidToolbarComp from "../components/raid/RaidToolbarComp";

    export default {
        name: "RaidPage",
        components: {RaidToolbarComp},
        props: ['user', 'raid'],
        asyncComputed: {
            role: function() {
                if (this.user && this.raid) {
                    return _raids.role(this.raid.id, this.user.id);
                }
            }
        },
        data: () => ({
            termin: null
        }),
        methods: {
            saveTermin: function(termin) {
                this.termin = termin;
                this.$router.push('aufstellung')
            }
        },
        created: function() {
            if (!this.raid) window.location.href = '/#/raids';
        }
    }
</script>

<style scoped>

</style>