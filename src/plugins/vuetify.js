import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {

      light: {
        primary: '#3f51b5',
        secondary: '#e91e63',
        accent: colors.grey,
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3',
        success: '#4caf50'
      },

      dark: {
        primary: colors.blue.lighten3,
      },

    },
  },
});
