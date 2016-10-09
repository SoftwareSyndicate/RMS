import Vue from 'vue'
import createLogger from 'vuex/dist/logger'
import Vuex from 'vuex'

import UsersModule from './modules/UsersModule'
import GymsModule from './modules/GymsModule'
import WallsModule from './modules/WallsModule'
import RoutesModule from './modules/RoutesModule'

import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    UsersModule,
    GymsModule,
    WallsModule,
    RoutesModule
  },
  actions,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

