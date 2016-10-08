import Vue from 'vue'
import Vuex from 'vuex'

import RoutesModule from './modules/RoutesModule'

/* import * as actions from './actions'
   import * as getters from './getters' */

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    RoutesModule
  },
  /* actions,
     getters, */
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

