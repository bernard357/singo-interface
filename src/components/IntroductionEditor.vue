<template>
  <v-container align-center class="pa-0">

    <v-textarea v-if="editIntroduction && canUpdate()"
                v-model.trim="item.introduction"
                v-focus
                autofocus
                :label="placeholder"
                @input="emitChange()"
                @blur="editIntroduction=false;"
                @keyup.enter="editIntroduction=false;"
                class="pa-1 mt-2"
                rows="2"></v-textarea>

    <template v-else>
      <div @click="editIntroduction=true;">
        <span v-html="htmlContent" />
      </div>
    </template>

  </v-container>
</template>

<script>
import bus from '@/event-bus'
import identity from '@/identity'

export default {

  name: 'IntroductionEditor',

  props: {
    item: Object,
    placeholder: String,
  },

  data() {
    return {

      editIntroduction: false,

    }
  },

  computed: {

    htmlContent: function() {
        return this.item.introduction || this.placeholder
    },

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
