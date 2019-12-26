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
                v-bind:user="user"
                v-on:saveTermin="saveTermin"
                v-bind:termin="termin"
                v-bind:width="width"
        >
        </router-view>
    </div>
</template>

<script>
    import RaidToolbarComp from "../components/raid/RaidToolbarComp";

    export default {
        name: "RaidPage",
        components: {RaidToolbarComp},
        props: ['user', 'raid', 'termin', 'width'],
        methods: {
            saveTermin: function(termin) {
                this.$emit('saveTermin', termin);
            }
        },
        computed: {
            role: function() {
                if (this.raid) return this.raid.role;
                else return 0;
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