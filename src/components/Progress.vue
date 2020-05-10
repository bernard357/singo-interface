<template>
  <v-progress-linear :active="loading"
                     :indeterminate="loading"
                     absolute
                     bottom
                     color="pink accent-4" />
</template>

<script>
import bus from '@/event-bus'

export default {

  name: 'SingoProgress',

  data() {
    return {

      loading: false,

    }
  },

  methods: {

    start() {
      this.loading = true
    },

    stop() {
      this.loading = false
    },

  },

  created() {
    bus.$on('begin-transaction', this.start)
    bus.$on('end-transaction', this.stop)
  },

  beforeDestroy() {
    bus.$off('begin-transaction', this.start)
    bus.$off('end-transaction', this.stop)
  },

}
</script>
