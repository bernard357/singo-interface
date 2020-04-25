<template>
  <v-container align-center>
    <h1>{{ pageTitle }}</h1>

    <HelloWorld msg="Welcome to Your Vue.js App"/>

  </v-container>
</template>

<script>
import { Labels } from '@/meta.js'

// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',

  components: {
    HelloWorld
  },

  data: () => ({
    pageTitle: Meta.homeTitle,
  }),

  created(){
    document.title = Labels.homeTitle
  },


}
</script>
