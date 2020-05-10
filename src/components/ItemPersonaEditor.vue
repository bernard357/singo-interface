<template>
  <v-container align-center class="pa-0">

    <v-container v-if="mutable && editable && activated">
      <v-select :label="label"
                :items="options"
                v-model="content"
                @input="onChange()"
                @blur="activated=false;"
                @keyup.enter="activated=false;"
                dense
                autofocus>
      </v-select>
    </v-container>

    <template v-else>
      <v-list-item two-line>
        <v-list-item-content @click="activated=true;">
          <v-list-item-title>{{ label }}</v-list-item-title>
          <v-list-item-subtitle>{{ customizedPersona }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

  </v-container>
</template>

<script>
import bus from '@/event-bus'
import { c11n } from '@/customization'

export default {

  name: 'ItemPersonaEditor',

  props: {
    label: String,
    item: Object,
    attribute: String,
    editable: Boolean,
  },

  data() {
    return {

      options: [
        {value: 'registered', text: c11n.registeredPersona},
        {value: 'member', text: c11n.memberPersona},
        {value: 'leader', text: c11n.leaderPersona},
        {value: 'audit', text: c11n.auditPersona},
      ],

      content: null,

      activated: false,

    }
  },

  watch: {

    item: function (val) {
      this.content = val[ this.attribute ]
    }

  },

  computed: {

    customizedPersona() {
      return c11n.labelPersona(this.content)
    },

    mutable() {  // 'support' and 'robot' can not be changed
      return ['registered', 'member', 'leader', 'audit'].includes(this.content)
    },

  },

  methods: {

    onChange() {
      this.item[this.attribute] = this.content
      bus.$emit('change')
    },

  },

}
</script>
