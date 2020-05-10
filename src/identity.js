
import Vue from "vue";

export const identity = Vue.observable({

  surfer_label: '-',
  surfer_persona: 'anonymous',

  setIdentity(data) {
    console.log(data)
    this.surfer_e_mail = data.e_mail
    this.surfer_label = data.first_name + ' ' + data.last_name
    this.surfer_persona = data.persona
  },

  resetIdentity() {
    this.surfer_e_mail = '-'
    this.surfer_label = '-'
    this.surfer_persona = 'anonymous'
  },

});

export default identity
