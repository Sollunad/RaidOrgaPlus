<template>
    <v-footer app fixed>
        <div class="footer">
            <v-dialog width="600">
                <span class="version" slot="activator">v{{ versionNo }}</span>
                <ChangelogComp></ChangelogComp>
            </v-dialog>
            <span class="footerText">Made with ❤ by Sollunad.9780</span>
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
            versionNo: '0.1',
        }),
        computed: {
            footerText: function() {
                return `v${this.versionNo} (${this.versionTitle})`;
            }
        }
    }
</script>

<style scoped>
    .footer {
        text-align: center;
        width: 100%;
    }

    .footerText {
        margin-left: 10px;
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