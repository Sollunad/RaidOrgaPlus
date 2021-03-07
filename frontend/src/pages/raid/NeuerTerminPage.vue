<template>
    <div class="form">
        <NeuerTerminComp
                v-if="showNeuerTermin">
        </NeuerTerminComp>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import NeuerTerminComp from "../../components/raid/NeuerTerminComp.vue";

    export default Vue.extend({
        name: "NeuerTerminPage",
        components: {NeuerTerminComp},
        computed: {
            showNeuerTermin: function(): boolean {
                return this.$vStore.getters.raidRole > 0;
            }
        }
    })
</script>

<style scoped>
    .form {
        margin: 5%;
    }
</style>