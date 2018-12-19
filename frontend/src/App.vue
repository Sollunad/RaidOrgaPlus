<template>
  <v-app id="inspire" dark>
    <MenuComp></MenuComp>
    <v-content>
    </v-content>
    <FooterComp></FooterComp>
  </v-app>
</template>

<script>
  import MenuComp from './components/MenuComp.vue';
  import FooterComp from "./components/FooterComp";

  export default {
    components: {
      FooterComp,
      MenuComp,
    },

    props: {
      source: String
    }
  }
</script>