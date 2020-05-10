<template>
  <!-- https://scotch.io/tutorials/how-to-handle-file-uploads-in-vue-2 -->
  <v-container align-center class="pa-0">

    <v-btn top left color="pink" dark fab small absolute class="mt-11 hidden-sm-and-down" @click="jumpToIndex()" >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <h1>{{ profileTitle }}</h1>

    <v-row>

      <v-col cols="12" md="4">
        <v-card class="mr-auto mt-6"
                max-width="400"
                tile >

          <item-editor v-bind:label="c11n.firstNameHeader"
                       v-bind:item="profile"
                       attribute="first_name"
                       v-bind:editable="canUpdateProfile"></item-editor>

          <item-editor v-bind:label="c11n.lastNameHeader"
                       v-bind:item="profile"
                       attribute="last_name"
                       v-bind:editable="canUpdateProfile"></item-editor>

          <item-editor v-bind:label="c11n.phoneNumberHeader"
                       v-bind:item="profile"
                       attribute="phone_number"
                       v-bind:editable="canUpdateProfile"></item-editor>

          <item-editor v-bind:label="c11n.eMailHeader"
                       v-bind:item="profile"
                       attribute="e_mail"
                       v-bind:editable="false"></item-editor>  <!-- impact record id -->

          <item-editor v-bind:label="c11n.keywordsHeader"
                       v-bind:item="profile"
                       attribute="keywords"
                       v-bind:editable="canUpdateProfile"></item-editor>

          <item-persona-editor v-bind:label="c11n.personaHeader"
                               v-bind:item="profile"
                               attribute="persona"
                               v-bind:editable="canUpdatePersona"></item-persona-editor>

          <item-password-editor v-bind:label="c11n.passwordLabel"
                               v-bind:item="profile"
                               attribute="password"
                               v-bind:editable="canUpdateProfile"></item-password-editor>

        </v-card>
      </v-col>

      <v-col cols="12" md="4" v-if="c11n.withCamera">
        <camera />
      </v-col>

    </v-row>

    <html-editor v-bind:item="profile" v-bind:placeholder="placeholder.content"/>

    <v-btn v-if="canDeleteProfile" bottom color="pink" dark fab fixed right @click="deleteProfile()" >
      <v-icon>mdi-minus</v-icon>
    </v-btn>

    <confirm-dialog ref="confirm" />
  </v-container>
</template>

<script>
import { generate } from 'shortid'
import { c11n } from '@/customization'
import bus from '@/event-bus'
import endpoint from '@/endpoint'
import identity from '@/identity'
import Camera from '@/components/Camera'
import ConfirmDialog from '@/components/ConfirmDialog'
import HtmlEditor from '@/components/HtmlEditor'
import ItemEditor from '@/components/ItemEditor'
import ItemPasswordEditor from '@/components/ItemPasswordEditor'
import ItemPersonaEditor from '@/components/ItemPersonaEditor'

export default {

  name: 'Profile',

  components: {
    Camera,
    ConfirmDialog,
    HtmlEditor,
    ItemEditor,
    ItemPasswordEditor,
    ItemPersonaEditor,
  },

  data() {
    return {

      placeholder: {

        content: c11n.contentPlaceholder,
        title: c11n.titlePlaceholder,

      },

      profile: {  // the thing that is made persistent

        first_name: null,
        last_name: null,
        phone_number: null,
        e_mail: null,
        category: null,
        persona: null,
        content: null,
        date: new Date().toISOString().substr(0, 10),
        editor: null,
        id: null,
        stamp: null,
        title: null,
        version: null,
        previous_version: null,

      },

      save: {  // for the loop that saves content periodically
        timer: null,
        stamp: null,
      },

      c11n: c11n,
    }
  },

  computed: {

    profileTitle() {
      if (this.profile.first_name || this.profile.last_name) {
        return this.profile.first_name + ' ' + this.profile.last_name
      }
      return this.profile.e_mail
    },

    canUpdateProfile() {
      if (identity.surfer_e_mail == this.profile.e_mail) { return true }
      return ['leader', 'support'].includes(identity.surfer_persona)
    },

    canUpdatePersona() {
      return ['leader', 'support'].includes(identity.surfer_persona)
    },

    canDeleteProfile() {
      if (identity.surfer_e_mail == this.profile.e_mail) { return true }
      return ['leader', 'support'].includes(identity.surfer_persona)
    },

  },

  methods: {

    clickHere() {
      console.log('click!')
    },

    jumpToIndex() {
      this.$router.push('/identities')
    },

    getProfile() {
      console.log("get /users/"+this.profile.id)
      endpoint({ method: "GET", url: '/users/'+this.profile.id }).then(
        result => {
          console.log(result.data.user)
          this.profile = result.data.user
          if (! this.profile.title) {
            this.profile.title = this.profile.first_name + ' ' + this.profile.last_name
          }
          this.save.stamp = this.profile.stamp
          document.title = this.profile.title
        },
        error => {
          if (error.response.status !=  404) {
            bus.$emit('alert', {message: error.response.data.description, code: error.response.status })
          }
        }
      );
    },

    saveProfile(){
      console.debug(`put /users/${this.profile.id}`)
      document.title = this.profile.title
      this.profile.previous_version = this.profile.version
      this.profile.version = generate()
      endpoint({ method: "PUT", url: `/users/${this.profile.id}`, data: this.profile }).then(
        () => { console.debug("profile has been saved") },
        error => {
          bus.$emit('alert', {message: error.response.data.description, code: error.response.status })
          if (error.response.status ==  409) { this.getProfile() }
        }
      );

    },

    deleteProfile(){
      this.$refs.confirm.open(c11n.confirmProfileDeletionTitle, c11n.confirmProfileDeletionText, { color: 'pink' }).then((confirm) => {
        if (confirm) {
          console.debug(`delete /users/${this.profile.id}`)
          endpoint({ method: "DELETE", url: `/users/${this.profile.id}` }).then(
            () => { this.$router.push('/identities') },
            error => {
              bus.$emit('alert', {message: error.response.data.description, code: error.response.status })
            }
          );
        }
      });
    },

    stampChange() {
      this.profile.stamp = Date.now() / 1000
      this.profile.editor = identity.surfer_label
    },

    putIfChanged() {
      if (this.save.stamp != this.profile.stamp) {
        this.save.stamp = this.profile.stamp
        this.saveProfile()
      }
    },

  },

  mounted() {
    this.profile.id = this.$route.params.id
    this.getProfile()
  },

  created() {
    bus.$on('change', this.stampChange)
    this.save.timer = setInterval(this.putIfChanged, 1000)
    document.title = c11n.profileDefaultPageTitle
  },

  beforeDestroy() {
    bus.$off('change', this.stampChange)
    clearInterval(this.save.timer)
  },

}
</script>
