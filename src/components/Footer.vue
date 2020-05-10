<template>
    <v-footer app color="primary" dark>
      {{ footerText }}
      <slot></slot>
    </v-footer>
</template>

<script>
import { c11n } from '@/customization.js'

export default {

  name: 'SingoFooter',

  data() {
    return {

      footerText: c11n.footerText,

    }
  },

}
</script>

<style lang="scss">
</style>
