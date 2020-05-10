<template>
  <v-card class="mx-auto pa-0"
          max-width="400"
          :to="path+id">

    <v-img class="white--text align-end"
           height="200px"
           :src="oneImage()">

      <v-card-title>{{ title }}</v-card-title>

    </v-img>

    <!-- <v-card-subtitle class="pb-0" v-if="date">{{ date }}</v-card-subtitle> -->

    <v-card-text class="text--primary">
      <slot></slot>
      <div><span v-html="introduction" /></div>
    </v-card-text>

    <v-card-actions>
      <v-btn :to="path+id"
             :color="primary"
             text>{{ c11n.exploreButton }}</v-btn>
      <v-spacer />
      <div v-if="draft" class="py-1 ml-3"><v-icon>mdi-lead-pencil</v-icon><span class="grey--text">{{ c11n.draftLabel }}</span></div>
    </v-card-actions>
  </v-card>
</template>

<script>
import { c11n } from '@/customization.js'

export default {
  name: 'PageCard',

  props: {
    path: { type: String, required: true },
    title: { type: String, required: true },
    introduction: { type: String, required: true },
    id: { type: String, required: true },
    planned: Boolean,
    draft: Boolean,
    date: String,
  },

  data() {
    return {

      c11n: c11n,
      primary: c11n.primaryColor,

      images: [
        "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
        "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
      ],

    }
  },

  methods: {

    oneImage() {
      let index = Math.floor(Math.random() * this.images.length)
      return this.images[ index ]
    },

  },

};
</script>
