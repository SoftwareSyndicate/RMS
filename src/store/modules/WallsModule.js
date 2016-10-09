/* Walls Module */

import * as types from '../mutation-types'

// initial state
const state = {
  all: [],
  active: null
}

// mutations
const mutations = {
  [types.SET_ACTIVE_WALL]: (state, { wall }) => {
    state.activeWall = wall;
  },

  [types.SET_WALLS]: (state, { walls }) => {
    walls.forEach(wall => {
      if (wall) {
        Vue.set(state.walls, wall.id, wall)
      }
    })
  }

}

export default {
  state,
  mutations
}
