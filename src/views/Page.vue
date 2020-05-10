<template>
  <v-container align-center class="pa-0">

    <v-btn top left color="pink" dark fab small absolute class="mt-11 hidden-sm-and-down" @click="jumpToIndex()" >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <title-editor v-bind:item="page" v-bind:placeholder="placeholder.title"/>

    <introduction-editor v-bind:item="page" v-bind:placeholder="placeholder.introduction"/>

    <html-editor v-bind:item="page" v-bind:placeholder="placeholder.content"/>

    <v-btn v-if="canDeletePage" bottom color="pink" dark fab fixed right @click="deletePage()" >
      <v-icon>mdi-minus</v-icon>
    </v-btn>

    <v-divider class="mt-12"></v-divider>
    <p class="smaller font-weight-light font-italic my-3">{{ lastModification }}</p>

    <!-- only for people entitled to access and change meta-information -->

    <template v-if="canUpdate">

      <!-- help core member to contribute -->

      <!-- <v-alert type="info">{{ c11n.pageInformationForCoreMember }}</v-alert> -->

      <!-- change exposure of the page -->

      <v-container class="pa-0">

        <v-row no-gutters>

          <v-col cols=8>
            <v-checkbox v-model="page.draft"
                        :label="c11n.draftLabel"
                        @change="toggleDraft()"
                        color=silver
                        hide-details></v-checkbox>
          </v-col>

          <v-col cols=4>
            <v-select :items="audienceItems"
                      v-model="audience"
                      @change="changeChannel()"
                      :prepend-icon="c11n.channelIcon"></v-select>
          </v-col>

        </v-row>

        <!-- display page in calendar -->

        <!-- <v-row no-gutters>

          <v-col cols=8>
            <v-checkbox v-model="page.planned"
                        :label="c11n.plannedLabel"
                        @change="$emit('change')"
                        color=silver
                        hide-details></v-checkbox>
          </v-col>

          <v-col cols=4>
            <v-dialog ref="dialog"
                      v-model="displayDatePicker"
                      :return-value.sync="page.date"
                      persistent
                      width="290px"
                      height="450px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="page.date"
                              prepend-icon="mdi-calendar-text"
                              readonly
                              v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="page.date" scrollable :locale="c11n.locale">
                <v-spacer></v-spacer>
                <v-btn text
                       @click="displayDatePicker = false"
                       color="primary">{{ c11n.cancelLocale }}</v-btn>
                <v-btn text
                       @click="$refs.dialog.save(page.date); $emit('change')"
                       color="primary">{{ c11n.okLocale }}</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>

        </v-row> -->

      </v-container>

    </template>

    <confirm-dialog ref="confirm" />
  </v-container>
</template>

<script>
import path  from 'path'
import { generate } from 'shortid'
import { c11n } from '@/customization'
import bus from '@/event-bus'
import endpoint from '@/endpoint'
import identity from '@/identity'
import ConfirmDialog from '@/components/ConfirmDialog'
import HtmlEditor from '@/components/HtmlEditor'
import IntroductionEditor from '@/components/IntroductionEditor'
import TitleEditor from '@/components/TitleEditor'

export default {

  name: 'Page',

  components: {
    ConfirmDialog,
    HtmlEditor,
    IntroductionEditor,
    TitleEditor,
  },

  data() {
    return {

      placeholder: {

        content: c11n.contentPlaceholder,
        introduction: c11n.introductionPlaceholder,
        title: c11n.titlePlaceholder,

      },

      page: {  // the thing that is made persistent

        content: null,
        date: new Date().toISOString().substr(0, 10),
        draft: false,
        editor: null,
        id: null,
        introduction: null,
        planned: false,
        stamp: null,
        title: null,
        version: null,
        previous_version: null,

      },

      audience: null,
      audienceItems: [
        { value: 'universe', text: c11n.goToHomeLabel },
        { value: 'community', text: c11n.goToCommunityLabel },
        { value: 'board', text: c11n.goToBoardLabel },
      ],

      displayDatePicker: false,
      indexPath: null,

      save: {  // for the loop that saves content periodically
        timer: null,
        stamp: null,
      },

      c11n: c11n,
    }
  },

  computed: {

    lastModification() {
      if (this.page.stamp && this.page.editor) {
        let date = new Date(this.page.stamp * 1000)
        let replacements = {
          "%DATE%": date.toLocaleDateString(c11n.locale),
          "%TIME%": date.toLocaleTimeString(c11n.locale),
          "%EDITOR%": this.page.editor
        }
        return c11n.modificationString.replace(/%\w+%/g, function(all) {
          return replacements[all] || all;
        });
      }
      return ''
    },

    channel() {
      console.log("path: "+this.$route.path)
      var prefix = path.dirname(this.$route.path)
      if (prefix == '/') { return 'universe' }
      return prefix.substring(1)
    },

    canUpdate() {
      return ['leader', 'support'].includes(identity.surfer_persona)
    },

    canDeletePage() {
      return ['leader', 'support'].includes(identity.surfer_persona)
    },

  },

  methods: {

    toggleDraft() {
      console.log('zoo')
      bus.$emit('change')
    },

    changeChannel() {
      alert('pas encore implémenté')
    },

    jumpToIndex() {
      this.$router.push(path.dirname(this.$route.path))
    },

    getPage() {
      console.debug(`get ${this.$route.path}`)
      endpoint({ method: "GET", url: this.$route.path }).then(
        result => {
          console.log(result.data.item)
          this.page = result.data.item
          this.save.stamp = this.page.stamp
          document.title = this.page.title
        },
        error => {
          // maybe the page does not exist yet
          if (error.response.status !=  404) {
            bus.$emit('alert', {'message': error.response.data.description, 'code': error.response.status })
          }
        }
      );
    },

    savePage(){
      console.debug(`put ${this.$route.path}`)
      document.title = this.page.title
      this.page.previous_version = this.page.version
      this.page.version = generate()
      endpoint({ method: "PUT", url: this.$route.path, data: this.page }).then(
        () => { console.debug("page has been saved") },
        error => {
          bus.$emit('alert', {'message': error.response.data.description, 'code': error.response.status })
          if (error.response.status ==  409) { this.getPage() }
        }
      );
    },

    deletePage(){
      this.$refs.confirm.open(c11n.confirmPageDeletionTitle, c11n.confirmPageDeletionText, { color: 'pink' }).then((confirm) => {
        if (confirm) {
          console.debug(`delete ${this.$route.path}`)
          endpoint({ method: "DELETE", url: this.$route.path }).then(
            () => { this.jumpToIndex() },
            error => {
              bus.$emit('alert', {'message': error.response.data.description, 'code': error.response.status })
            }
          );
        }
      });
    },

    stampChange() {
      this.page.stamp = Date.now() / 1000
      this.page.editor = identity.surfer_label
    },

    putIfChanged() {
      if (this.save.stamp != this.page.stamp) {
        this.save.stamp = this.page.stamp
        this.savePage()
      }
    },

  },

  mounted() {
    if (this.$route.params.id && (this.$route.params.id.length > 6)) {
      this.page.id = this.$route.params.id
    } else {
      var prefix = path.dirname(this.$route.path)
      if (prefix != '/') { prefix += '/' }
      this.$router.push(prefix+generate())
    }
    this.audience = this.channel
    this.indexPath = path.dirname(this.$route.path)
    this.getPage()
  },

  created() {
    bus.$on('change', this.stampChange)
    this.save.timer = setInterval(this.putIfChanged, 1000)
    document.title = c11n.pageDefaultPageTitle
  },

  beforeDestroy() {
    bus.$off('change', this.stampChange)
    clearInterval(this.save.timer)
  },


}
</script>

<style scoped>
  .smaller {
    font-size: 0.8em;
  }
</style>
