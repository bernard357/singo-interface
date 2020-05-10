<template>
  <v-container align-center class="pa-0">
    <v-card class="mx-auto mt-12" max-width="500" >

      <v-toolbar color="pink" dark >
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-form ref="form">
        <v-container>

          <v-text-field v-model="input.first_name"
                        :rules="[rules.firstNameRequired]"
                        :label="c11n.firstNameLabel"
                        required ></v-text-field>

          <v-text-field v-model="input.last_name"
                        :rules="[rules.lastNameRequired]"
                        :label="c11n.lastNameLabel"
                        required ></v-text-field>

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

          <v-text-field v-if="withSecret"
                        v-model="input.secret"
                        :label="c11n.secretLabel"></v-text-field>

        </v-container>

        <v-card-actions>
          <v-btn color="secondary" @click="submit">{{ c11n.submitButton }}</v-btn>
        </v-card-actions>

      </v-form>

    </v-card>

  </v-container>
</template>

<script>
import { c11n } from '@/customization'
import bus from '@/event-bus'
import { endpoint } from '@/endpoint'
import identity from '@/identity'

export default {

  name: "Register",

  data() {
    return {

      title: c11n.registerPageTitle,

      valid: false,

      input: {
        first_name: '',
        last_name: '',
        e_mail: '',
        password: '',
        secret: null,
      },

      passwordVisible: false,

      rules: {
        firstNameRequired: value => !!value || c11n.firstNameIsRequiredLabel,
        lastNameRequired: value => !!value || c11n.lastNameIsRequiredLabel,
        emailRequired: value => !!value || c11n.emailIsRequiredLabel,
        emailTested: v => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/.test(v) || c11n.emailIsInvalidLabel,
        passwordRequired: value => !!value || c11n.passwordIsRequiredLabel,
        passwordTested: v => v.length >= 8 || c11n.passwordIsInvalidLabel,
      },

      withSecret: false,

      c11n: c11n,

    }
  },

  computed: {

    isAuthenticated() {
        return (identity.surfer_persona && identity.surfer_persona != 'anonymous')
    },

  },

  methods: {

    submit() {
      if (this.$refs.form.validate()) {
        console.debug(`post /register for email: ${this.input.e_mail}`);
        endpoint({ method: "POST", url: "register", data: this.input }).then(
          () => {
            if (!this.isAuthenticated) {
              console.debug('need to authenticate')
              this.$router.push({ path: 'authenticate', query: { e_mail: this.input.e_mail } })
            } else {
              console.debug('display updated list of identities')
              this.$router.push('/identities')
            }
          },
          error => {
            bus.$emit('alert', {'message': error.response.data.description, 'code': error.response.status })
          }
        );
      }
    },

  },

  mounted() {
    if (this.$route.query.e_mail) {
      this.input.e_mail = this.$route.query.e_mail
      this.title = c11n.welcomeAndRegisterPageTitle
    }
    if (this.$route.query.password) {
      this.input.password = this.$route.query.password
      this.title = c11n.welcomeAndRegisterPageTitle
    }
    if (this.$route.query.secret) {
      this.withSecret = true
    }
  },

  created(){
    document.title = c11n.registerPageTitle
  },

}
</script>
