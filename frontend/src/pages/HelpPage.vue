<template>
    <div class="container">
        <iframe src="https://docs.google.com/document/d/e/2PACX-1vTnQf-KGAqxGknr1tBa4cbOEUhjguJTf6ZoTGekc2tUjj7DPcLVWa4Et16AST_SsV9UDlcVO57ZtXTH/pub?embedded=true" class="iframe"></iframe>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';

    export default Vue.extend({
        name: "HelpPage"
    })
</script>

<style scoped>
    .container {
        display: flex;
        width: inherit;
        height: 95%;
    }

    .iframe {
        flex-grow: 1;
    }
</style>