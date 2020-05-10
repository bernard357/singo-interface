<template>
  <v-container align-center class="pa-0">

    <textarea v-if="editTitle && canUpdate()"
              v-model.trim="item.title"
              v-focus
              @input="emitChange()"
              @blur="editTitle=false;"
              @keyup.enter="editTitle=false;"
              class="display-1 pa-1 mt-4"
              rows="1"></textarea>

    <template v-else>
        <h1 @click="editTitle=true;">{{ item.title || placeholder }}</h1>
    </template>

  </v-container>
</template>

<script>
import bus from '@/event-bus'
import identity from '@/identity'

export default {

  name: 'TitleEditor',

  props: {
    item: Object,
    placeholder: String,
  },

  data() {
    return {

      editTitle: false,

    }
  },

  methods: {

    canUpdate() {
      return ['leader', 'support'].includes(identity.surfer_persona)
    },

    emitChange() {
      bus.$emit('change')
    },

  },

}
</script>

<style scoped>

.v-content textarea {
  width: 100%;
  border-style: solid;
  border-width: 1px;
  border-color: silver;
  outline: none !important;
  -webkit-appearance:none;
  box-shadow: none !important;
}

</style>
