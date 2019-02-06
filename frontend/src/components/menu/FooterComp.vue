<template>
    <v-footer app fixed>
        <span class="footerText">{{ footerText }}</span>
        <a class="feedback" target="_newtab" href="https://goo.gl/forms/VSlcFr3DdhK0flDe2">Feedback?</a>
    </v-footer>
</template>

<script>
    export default {
        name: "FooterComp",
        data: () => ({
            versionNo: '0.1',
            versionTitle: 'alpha'
        }),
        computed: {
            footerText: function() {
                return `v${this.versionNo} (${this.versionTitle}) - Made with ❤ by Sollunad.9780`;
            }
        }
    }
</script>

<style scoped>
    .feedback {
        margin-left: 10px;
        text-decoration: underline;
        color: inherit;
    }

    .feedback:hover {
        cursor: pointer;
    }
</style>