<template>
    <div class="container">
        <EinladungenComp
            v-bind:user="user"
            class="einladungen">
        </EinladungenComp>
        <CalendarComp></CalendarComp>
    </div>
</template>

<script>
    import EinladungenComp from "../components/einstellungen/EinladungenComp";
    import _users from '../services/endpoints/users';
    import CalendarComp from "../components/calendar/CalendarComp";

    export default {
        name: "HomePage",
        components: {CalendarComp, EinladungenComp},
        props: ['user'],
        asyncComputed: {
            hasNoApi: async function() {
                if (this.user) return !(await _users.hasApi());
            }
        }
    }
</script>

<style scoped>
    .einladungen {
        margin-bottom: 20px;
    }
</style>