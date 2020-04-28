<template>
    <router-view class="page"
            v-on:saveRaid="saveRaid"
            v-on:saveTermin="saveTermin"
            v-on:saveBoth="saveBoth"
            v-bind:raid="raid"
            v-bind:termin="termin">
    </router-view>
</template>

<script>
    export default {
        name: "MainPage",
        data: () => ({
            raid: null,
            termin: null
        }),
        methods: {
            saveRaid: function(raid) {
                this.raid = raid;
                this.$router.push('raid');
            },
            saveTermin: function(termin) {
                this.termin = termin;
                this.$router.push('aufstellung');
            },
            saveBoth: function(clicked) {
                this.raid = clicked.raid;
                this.termin = clicked.termin;
                this.$router.push('raid/aufstellung');
            }
        }
    }
</script>

<style scoped>
    @media only screen and (min-width: 600px) {
        .page {
            margin: 1% 2%;
        }
    }
</style>