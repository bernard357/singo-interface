<template>
  <v-container class="alerts" v-if="alerts && alerts.length">
    <template v-for="alert in alerts">
      <v-alert class="mt-10" prominent type="error" v-bind:key="alert" >
        <v-row align="center">
          <v-col class="grow">{{ alert }}</v-col>
          <v-col class="shrink">
            <v-btn @click="clearAlert(alert)">{{ c11n.closeAlertLabel }}</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </template>
  </v-container>
</template>

<script>
import bus from '@/event-bus'
import { c11n } from '@/customization.js'

export default {
  name: 'Alerts',

  data() {
    return {

      alerts: [],

      customized: {
        403: c11n.code403Message,
      },

      c11n: c11n,
    }
  },

  methods: {

    pushAlert(alert) {  // expecting alert.code and alert.message
      var message = alert.message
      if (alert.code) {
        if (this.customized[alert.code]) {
          message = this.customized[alert.code]
        } else {
          message = message + ' (' + alert.code + ')'
        }
      }
      this.alerts.push(message)
    },

    clearAlert(alert) {
      this.alerts = this.alerts.filter((value) => { return value !== alert })
    },

  },

  created() {
    bus.$on('alert', this.pushAlert)
    bus.$on('clear-alert', this.clearAlert)
  },

  beforeDestroy() {
    bus.$off('alert', this.pushAlert)
    bus.$off('clear-alert', this.clearAlert)
  },

}
</script>

<style>

div.alerts {
  z-index:10
}
</style>
