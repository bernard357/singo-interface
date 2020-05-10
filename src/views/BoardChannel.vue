<template>
  <v-container align-center class="pa-0">
    <h1>{{ c11n.boardChannelPageTitle }}</h1>

    <Channel path="/board/"/>

  </v-container>
</template>

<script>
import { c11n } from '@/customization'
import Channel from '@/components/Channel'

export default {

  name: 'BoardChannel',

  components: {
    Channel
  },

  data: () => ({
    c11n: c11n,
  }),

  created(){
    document.title = c11n.boardChannelPageTitle
  },


}
</script>
