<template>
  <named-item path="/item/about" v-bind:placeholder="placeholder" />
</template>

<script>
import { c11n } from '@/customization'
import NamedItem from '@/components/NamedItem'


export default {

  name: 'Information',

  components: {
    NamedItem,
  },

  data() {
    return {

      placeholder: {
        title: c11n.informationPageTitle,
        content: c11n.informationPagePlaceholder,
      },

    }
  },

  created() {
    document.title = c11n.informationPageTitle
  },

};
</script>
