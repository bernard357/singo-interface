<template>
  <v-container fluid class="mx-0 px-0">

    <slot></slot>

    <v-row>
      <template v-for="item in pages">
        <v-col v-bind:key="item.id"
               cols="12"
               sm="6"
               md="4"
               lg="3">
          <PageCard v-bind="item" v-bind:path="path" />
        </v-col>
      </template>
    </v-row>

    <v-btn v-if="canAddPage" bottom color="pink" dark fab fixed right @click="newPage()" >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

  </v-container>

</template>

<script>
import { generate } from 'shortid'
import bus from '@/event-bus'
import endpoint from '@/endpoint'
import identity from '@/identity'
import PageCard from '@/components/PageCard'

export default {

  name: 'Channel',

  components: {
    PageCard,
  },

  props: {
    path: { type: String, default: '/' },
  },

  data() {
    return {

      pages: [],
      next: 'EOF',

    }
  },

  computed: {

    canAddPage() {
      return ['leader', 'support'].includes(identity.surfer_persona)
    },

  },

  methods: {

    newPage() {
      this.$router.push(this.path+generate())
    },

    getPage(){
      console.debug(`get ${this.next}`)
      endpoint({ method: "GET", url: this.next }).then(
        result => {
          let filtered = result.data.items.filter(r => !r.draft || this.canAddPage)
          this.pages = this.pages.concat(filtered)
          this.next = result.data.next
          if (this.next != 'EOF') { setTimeout(this.getPage, 1000)}
        },
        error => {
          bus.$emit('alert', {message: error.response.data.description, code: error.response.status })
        }
      );
    },

  },

  created(){
    this.next = this.path
    this.getPage()
  },


};
</script>
