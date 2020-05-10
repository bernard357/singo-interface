<template>
  <v-app>
    <singo-header v-bind="identity"></singo-header>

    <alerts />

    <v-content class="pt-9">
      <router-view />
    </v-content>

    <singo-footer></singo-footer>
  </v-app>
</template>

<script>
import SingoHeader from '@/components/Header'
import SingoFooter from '@/components/Footer'
import Alerts from '@/components/Alerts'
import bus from '@/event-bus'
import endpoint from '@/endpoint'
import identity from '@/identity'

export default {

  name: 'App',

  props: {
    source: String,
  },

  components: {
    Alerts,
    SingoHeader,
    SingoFooter,
  },

  data() {
    return {

      identity: identity,

      alerts: [],

    }
  },

  methods: {

    setIdentity(bearer) {
      if (bearer != 'no-bearer') {
        endpoint({ method: "POST", url: "check", data: {bearer: bearer}}).then(
          result => {
            identity.setIdentity(result.data)
          },
          error => {
            if(error.response.status == 403) {
              this.resetIdentity()
            } else {
              bus.$emit('alert', {message: error.response.data.description, code: error.response.status })
            }
          }
        );
      }
    },

    resetIdentity() {
      localStorage.setItem('bearer', 'no-bearer')
      identity.resetIdentity()
      this.$router.push('/')
    },

  },

  mounted() {
    bus.$on('bearer', this.setIdentity)
    bus.$on('no-bearer', this.resetIdentity)

    if(localStorage.getItem('bearer')) { this.setIdentity(localStorage.getItem('bearer')) }
  },

  beforeDestroy() {
    bus.$off('bearer', this.setIdentity)
    bus.$off('no-bearer', this.resetIdentity)
  }
}
</script>

<style>
h1 {
  margin-top: 0.5em;
}
</style>

<style lang="scss">

#nav {

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
