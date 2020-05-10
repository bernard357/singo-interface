<template>
  <v-container align-center class="pa-0">

    <v-container v-if="editable && activated">
      <v-text-field :label="label"
                    v-model="content"
                    @input="onChange()"
                    @blur="activated=false;"
                    @keyup.enter="activated=false;"
                    dense
                    autofocus>
      </v-text-field>
    </v-container>

    <template v-else>
      <v-list-item two-line>
        <v-list-item-content @click="activated=true;">
          <v-list-item-title>{{ label }}</v-list-item-title>
          <v-list-item-subtitle>{{ content }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

  </v-container>
</template>

<script>
import bus from '@/event-bus'

export default {

  name: 'ItemEditor',

  props: {
    label: String,
    item: Object,
    attribute: String,
    editable: Boolean,
  },

  data() {
    return {

      content: null,

      activated: false,

    }
  },

  watch: {

    item: function (val) {
      this.content = val[ this.attribute ]
    }

  },

  methods: {

    onChange() {
      this.item[this.attribute] = this.content
      bus.$emit('change')
    },

  },

}
</script>
