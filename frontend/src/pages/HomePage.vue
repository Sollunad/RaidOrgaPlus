<template>
    <div>
        <EinladungenComp
            v-bind:user="user"
            class="einladungen">
        </EinladungenComp>
        <HomepageTermineComp
            v-on:save="save">
        </HomepageTermineComp>
    </div>
</template>

<script>
    import EinladungenComp from "../components/homepage/EinladungenComp";
    import HomepageTermineComp from "../components/homepage/HomepageTermineComp";

    export default {
        name: "HomePage",
        components: {HomepageTermineComp, EinladungenComp},
        props: ['user'],
        methods: {
            save: function(clicked) {
                this.$emit('saveBoth', clicked);
            }
        }
    }
</script>

<style scoped>
    .einladungen {
        margin-bottom: 20px;
    }
</style>