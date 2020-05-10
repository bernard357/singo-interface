<template>
  <v-container align-center class="pa-0">
    <h1>{{ c11n.identitiesPageTitle }}</h1>

    <v-col cols="6" sm="3">
      <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :label="c11n.searchLabel"
              single-line
              hide-details
            ></v-text-field>
    </v-col>

    <v-data-table :headers="headers"
                  :items="profiles"
                  hide-default-footer
                  :search="search"
                  class="elevation-1 mt-4" >

                  <template v-slot:item.persona="{ item }">
                    {{ c11n.labelPersona(item.persona) }}
                  </template>

                  <template v-slot:item.link="{ item }">
                    <a :href="getLink(item.id)">{{ c11n.zoomLinkLabel }}</a>
                  </template>

    </v-data-table>

    <v-btn v-if="canAddProfile" bottom color="pink" dark fab fixed right @click="newProfile()" >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

  </v-container>
</template>

<script>
import { c11n } from '@/customization'
import bus from '@/event-bus'
import endpoint from '@/endpoint'
import identity from '@/identity'

export default {

  name: 'Identities',

  components: {
  },

  data() {
    return {

      search: '',

      headers: [
          { text: c11n.firstNameHeader, value: 'first_name', align: 'start'},
          { text: c11n.lastNameHeader, value: 'last_name' },
          { text: c11n.phoneNumberHeader, value: 'phone_number' },
          { text: c11n.eMailHeader, value: 'e_mail', sortable: false },
          { text: c11n.keywordsHeader, value: 'keywords' },
          { text: c11n.personaHeader, value: 'persona', sortable: false },
          { text: c11n.detailsHeader, value: 'link', sortable: false },
        ],

      profiles: [],
      next: '/users',

      c11n: c11n,

    }
  },

  computed: {

    canAddProfile() {
      return ['leader', 'support'].includes(identity.surfer_persona)
    },

  },

  methods: {

    newProfile() {
      this.$router.push('/register')
    },

    getLink(id) {
        return '/profile/'+id
    },

    getPage() {
      console.debug(`get ${this.next}`)
      endpoint({ method: "GET", url: this.next }).then(
        result => {
          this.profiles = this.profiles.concat(result.data.users)
          this.next = result.data.next
          if (this.next != 'EOF') { setTimeout(this.getPage, 1000)}
        },
        error => {
          bus.$emit('alert', {message: error.response.data.description, code: error.response.status })
        }
      );
    },

  },

  created(){
    document.title = c11n.identitiesPageTitle
    this.getPage()
  },


}
</script>
