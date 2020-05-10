<template>
  <v-container align-center class="pa-0" v-if="canUpdatePassword">

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>{{ label }}</v-list-item-title>
        <v-list-item-subtitle><a @click="activated=true;">{{ c11n.changePasswordLabel }}</a></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-dialog v-model="activated" :max-width="options.width" :style="{ zIndex: options.zIndex }" @keydown.esc="cancel">
      <v-card>
        <v-toolbar dark :color="options.color" dense flat>
          <v-toolbar-title class="white--text">{{ c11n.changePasswordLabel }}</v-toolbar-title>
        </v-toolbar>
        <v-form ref="form">
          <v-container my-4>
            <v-text-field v-model="content"
                          :rules="[rules.passwordRequired, rules.passwordTested]"
                          :type="passwordVisible ? 'text' : 'password'"
                          name="password"
                          :label="c11n.newPasswordLabel"
                          counter
                          :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="passwordVisible = !passwordVisible"
                          required ></v-text-field>
          </v-container>
        </v-form>
        <v-card-actions class="pt-0">
          <v-btn color="secondary" @click.native="savePassword">{{ c11n.submitButton }}</v-btn>
          <v-btn color="accent" @click.native="cancel">{{ c11n.cancelButton }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import bus from '@/event-bus'
import { c11n } from '@/customization'
import endpoint from '@/endpoint'
import identity from '@/identity'

export default {

  name: 'ItemPasswordEditor',

  props: {
    label: String,
    item: Object,
    attribute: String,
    editable: Boolean,
  },

  data() {
    return {

      message: 'hello world',

      content: '',

      activated: false,

      options: {
        color: 'secondary',
        width: 340,
        zIndex: 200
      },

      passwordVisible: false,

      canUpdatePassword: false,

      rules: {
        passwordRequired: value => !!value || c11n.passwordIsRequiredLabel,
        passwordTested: v => v && v.length >= 8 || c11n.passwordIsInvalidLabel,
      },

      c11n: c11n,
    }
  },

  watch: {

    item: function (val) {
      if (identity.surfer_e_mail == val.e_mail) {
        this.canUpdatePassword = true
      }
      console.log('not the same person)')
      if (['robot', 'support'].includes(val.persona)) {
        console.log('special personas')
        this.canUpdatePassword = ['support'].includes(identity.surfer_persona)
      } else {
        console.log('normal personas')
        this.canUpdatePassword =  ['leader', 'support'].includes(identity.surfer_persona)
      }
    }

  },

  computed: {

    customizedPersona() {
      return c11n.labelPersona(this.content)
    },

  },

  methods: {

    savePassword() {
      if (this.$refs.form.validate()) {
        console.debug(`put /users/${this.item.id}`)
        let payload = {}
        payload.password = this.content
        payload.previous_version = this.item.version
        payload.version = this.item.version
        console.debug(payload)
        endpoint({ method: "PUT", url: `/users/${this.item.id}`, data: payload }).then(
          () => {
            console.debug("password has been saved")
            this.activated = false
          },
          error => {
            bus.$emit('alert', {message: error.response.data.description, code: error.response.status })
          }
        );
      }
    },

    cancel() {
      this.activated = false
    },

  },

}
</script>
