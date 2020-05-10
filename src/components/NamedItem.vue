<template>
  <v-container align-center class="pa-0 mt-2">

    <title-editor v-bind:item="item" v-bind:placeholder="placeholder.title"/>

    <html-editor v-bind:item="item" v-bind:placeholder="placeholder.content"/>

  </v-container>
</template>

<script>
import { uuid } from 'uuidv4'
import { c11n } from '@/customization'
import bus from '@/event-bus'
import endpoint from '@/endpoint'
import identity from '@/identity'
import HtmlEditor from '@/components/HtmlEditor'
import TitleEditor from '@/components/TitleEditor'

export default {

  name: 'NamedItem',

  props: {
    path: String,
    placeholder: Object,
  },

  components: {
    HtmlEditor,
    TitleEditor,
  },

  data() {
    return {

      item: {
        title: '',
        content: '',
      },

      save: {  // for the loop that saves content periodically
        timer: null,
        stamp: null,
      },

      c11n: c11n,
    }
  },

  methods: {

    getItem() {
      console.debug("get "+this.path)
      endpoint({ method: "GET", url: this.path }).then(
        result => {
          // console.debug(result.data.item)
          this.item = result.data.item
          this.save.stamp = this.item.stamp
          document.title = this.item.title
        },
        error => {
          if (! error.response) {
            bus.$emit('alert', {message: error, code: 999})
          } else if (error.response.status !=  404) {
            bus.$emit('alert', {message: error.response.data.description, code: error.response.status })
          }
        }
      );
    },

    putItem(){
      console.debug("put "+this.path)
      document.title = this.item.title
      this.item.previous_version = this.item.version
      this.item.version = uuid()
      endpoint({ method: "PUT", url: this.path, data: this.item }).then(
        () => { console.debug("item has been saved") },
        error => {
          if (! error.response) {
            bus.$emit('alert', {message: error, code: 999})
          } else {
            bus.$emit('alert', {'message': error.response.data.description, 'code': error.response.status })
            if (error.response.status ==  409) { this.getItem() }
          }
        }
      );

    },

    stampChange() {
      this.item.stamp = Date.now() / 1000
      this.item.editor = identity.surfer_label
    },

    putIfChanged() {
      if (this.save.stamp != this.item.stamp) {
        this.save.stamp = this.item.stamp
        this.putItem()
      }
    },

  },

  mounted() {
    this.getItem()
  },

  created() {
    bus.$on('change', this.stampChange)
    this.save.timer = setInterval(this.putIfChanged, 1000)
  },

  beforeDestroy() {
    bus.$off('change', this.stampChange)
    clearInterval(this.save.timer)
  },

};
</script>
