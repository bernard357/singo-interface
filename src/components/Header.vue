<template>
  <v-container>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app >
      <v-list dense>

        <v-list-item link @click="transitionTo('/')" >
          <v-list-item-action>
            <v-icon>{{ c11n.goToHomeIcon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ c11n.goToHomeLabel }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="transitionTo('/community')" v-if="isMember">
          <v-list-item-action>
            <v-icon>{{ c11n.goToCommunityIcon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ c11n.goToCommunityLabel }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="transitionTo('/board')" v-if="isLeader">
          <v-list-item-action>
            <v-icon>{{ c11n.goToBoardIcon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ c11n.goToBoardLabel }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="transitionTo('/authenticate')" v-if="!isAuthenticated">
          <v-list-item-action>
            <v-icon>{{ c11n.goToAuthenticateIcon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ c11n.goToAuthenticateLabel }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="transitionTo('/identities')" v-if="isMember">
          <v-list-item-action>
            <v-icon>{{ c11n.goToIdentitiesIcon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ c11n.goToIdentitiesLabel }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="transitionTo('/information')" >
          <v-list-item-action>
            <v-icon>{{ c11n.goToInformationIcon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ c11n.goToInformationLabel }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4" >
        <span class="hidden-xs-and-down">{{ c11n.barTitle }}</span>
      </v-toolbar-title>

      <singo-progress />

      <v-spacer />

      <v-btn v-if="isAuthenticated"
             class="hidden-sm-and-down"
             text
             href="/authenticate">
        <span xlass="mr-2">{{ surfer_label }}</span>
      </v-btn>

    </v-app-bar>

  </v-container>
</template>

<script>
import SingoProgress from '@/components/Progress'
import { c11n } from '@/customization.js'

export default {

  name: 'SingoHeader',

  components: {
    SingoProgress,
  },

  props: {
      surfer_label: String,
      surfer_persona: String,
  },

  data() {
    return {

      drawer: false,

      c11n: c11n,
    }
  },

  computed: {

    isAuthenticated() {
        return (this.surfer_persona && this.surfer_persona != 'anonymous')
    },

    isMember() {
        return (this.surfer_persona && ['member', 'leader', 'support', 'audit'].includes(this.surfer_persona))
    },

    isLeader() {
        return (this.surfer_persona && ['leader', 'support', 'audit'].includes(this.surfer_persona))
    },

  },

  methods: {

    transitionTo: function (to) {
        this.drawer = false
        // console.log(this.$route)
        if(to != this.$route.path) {
          this.$router.push(to)
        }
    }

  },

  created() {
  }
}
</script>
