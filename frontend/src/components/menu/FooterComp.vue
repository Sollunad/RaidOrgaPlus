<template>
    <v-footer app fixed>
        <span class="footerText">{{ footerText }}</span>
        <span class="feedback" @click="openFeedback">Feedback?</span>
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
        },
        methods:{
            openFeedback: function() {
                this.$router.push('/feedback');
            }
        }
    }
</script>

<style scoped>
    .feedback {
        margin-left: 10px;
        text-decoration: underline;

    }

    .feedback:hover {
        cursor: pointer;
    }

</style>