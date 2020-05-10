<template>
  <v-container align-center class="pa-0">
    <h1>{{ c11n.homeChannelPageTitle }}</h1>

    <Channel path='/' />

  </v-container>
</template>

<script>
import { c11n } from '@/customization'
import Channel from '@/components/Channel'

export default {

  name: 'HomeChannel',

  components: {
    Channel
  },

  data: () => ({
    c11n: c11n,
  }),

  methods: {
  },

  created(){
    document.title = c11n.homeChannelPageTitle
  },


}
</script>
