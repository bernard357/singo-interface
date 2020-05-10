<template>
  <v-container align-center class="pa-0">

    <v-card v-if="isAuthenticated" class="mx-auto mt-12" max-width="500" >

      <v-toolbar color="pink" dark >
        <v-toolbar-title>{{ c11n.authenticatePageTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-container>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{ c11n.authenticationConfirmationMessage }}</v-list-item-title>
            <v-list-item-subtitle>{{ identity.surfer_label }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{ c11n.personaHeader }}</v-list-item-title>
            <v-list-item-subtitle>{{ c11n.labelPersona(identity.surfer_persona) }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{ c11n.eMailHeader }}</v-list-item-title>
            <v-list-item-subtitle>{{ identity.surfer_e_mail }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

      </v-container>

      <v-card-actions>
        <v-btn color="secondary" to="/" class="mr-2">{{ c11n.goToHomeLabel }}</v-btn>
        <v-btn color="accent" @click="logout">{{ c11n.logoutButton }}</v-btn>
      </v-card-actions>


    </v-card>

    <v-card v-else class="mx-auto mt-12" max-width="500" >

      <v-toolbar color="pink" dark >
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-form ref="form">
        <v-container>

          <v-text-field v-model="input.e_mail"
                        :rules="[rules.emailRequired, rules.emailTested]"
                        :label="c11n.emailLabel"
                        required ></v-text-field>

          <v-text-field v-model="input.password"
                        :rules="[rules.passwordRequired, rules.passwordTested]"
                        :type="passwordVisible ? 'text' : 'password'"
                        name="password"
                        :label="c11n.passwordLabel"
                        counter
                        :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="passwordVisible = !passwordVisible"
                        required ></v-text-field>

        </v-container>

        <v-card-actions>
          <v-btn color="secondary" @click="login">{{ c11n.loginButton }}</v-btn>
          <v-btn color="accent" @click="register" v-if="registration">{{ c11n.registerButton }}</v-btn>
        </v-card-actions>

      </v-form>

    </v-card>

  </v-container>
</template>

<script>
import { c11n } from '@/customization'
import bus from '@/event-bus'
import { set_bearer, endpoint } from '@/endpoint'
import identity from '@/identity'

export default {

  name: "Authenticate",

  data() {
    return {

      title: c11n.authenticatePageTitle,

      valid: false,

      input: {
        e_mail: '',
        id: '',
        password: '',
      },

      passwordVisible: false,

      registration: true,

      rules: {
        emailRequired: value => !!value || c11n.emailIsRequiredLabel,
        emailTested: v => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/.test(v) || c11n.emailIsInvalidLabel,
        passwordRequired: value => !!value || c11n.passwordIsRequiredLabel,
        passwordTested: v => v.length >= 8 || c11n.passwordIsInvalidLabel,
      },

      identity: identity,

      c11n: c11n,

    }
  },

  computed: {

    isAuthenticated() {
        return (identity.surfer_persona && identity.surfer_persona != 'anonymous')
    },

  },

  methods: {

    login() {
      if (this.$refs.form.validate()) {
        set_bearer('no-bearer')
        this.input.id = this.input.e_mail
        console.debug(`post /login for ${this.input.id}`);
        endpoint({ method: "POST", url: "login", data: this.input}).then(
          result => {
            set_bearer(result.data.bearer)
            bus.$emit('bearer', result.data.bearer)
          },
          error => {
            bus.$emit('no-bearer')
            if (error.response.status ==  404) {
              this.$router.push({ path: 'register', query: { e_mail: this.input.e_mail, password: this.input.password } })
            } else if (error.response.status == 403) {
              bus.$emit('alert', {message: c11n.authenticationFailureMessage, code: null })
            } else {
              bus.$emit('alert', {message: error.response.data.description, code: error.response.status })

            }

          }
        );
      }
    },

    logout() {
      bus.$emit('no-bearer')
    },

    register() {
      this.$router.push({ path: 'register', query: { e_mail: this.input.e_mail, password: this.input.password } })
    },

  },

  mounted() {
    if (this.$route.query.e_mail) {
      this.input.e_mail = this.$route.query.e_mail
      this.title = c11n.welcomeAndAuthenticatePageTitle
      this.registration = false
    }
  },

  created(){
    document.title = c11n.authenticatePageTitle
  },

}
</script>
