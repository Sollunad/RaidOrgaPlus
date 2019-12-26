<template>
    <v-footer app fixed>
        <div class="footer">
            <v-dialog width="600">
                <template v-slot:activator="{ on }">
                    <span class="version" v-on="on">v{{ versionNo }}</span>
                </template>
                <ChangelogComp></ChangelogComp>
            </v-dialog>
            <a class="feedback" target="_newtab" href="https://goo.gl/forms/VSlcFr3DdhK0flDe2">Feedback?</a>
        </div>
    </v-footer>
</template>

<script>
    import ChangelogComp from "./ChangelogComp";
    export default {
        name: "FooterComp",
        components: {ChangelogComp},
        data: () => ({
            versionNo: '2.0.1',
        })
    }
</script>

<style scoped>
    .footer {
        text-align: left;
        width: 100%;
    }

    .feedback {
        margin-left: 10px;
        text-decoration: none;
        color: inherit;
    }

    .version {
    }

    .version:hover {
        cursor: pointer;
    }
</style>