import * as types from './mutation-types'
import api from './api.js'


/* Users */
export const FETCH_USER = ({ commit, state }, { id }) => {
  return state.users[id]
       ? Promise.resolve(state.users[id])
    : fetchUser(id).then(user => commit(types.SET_USER, { user }))
}


/* Gyms */
export const FETCH_GYM = ({ commit, state }, { id }) => {
  return state.gyms[id]
       ? Promise.resolve(state.gyms[id])
    : fetchGym(id).then(gym => commit(types.SET_GYM, { user }))
}

/* Walls */
export const FETCH_WALLS = ({ commit, state }, { ids }) => {
  // only fetch walls that we don't already have.
  ids = ids.filter(id => !state.items[id])
    if (ids.length) {
      return fetchWalls(ids).then(walls => commit(tyes.SET_WALLS, { walls }))
    } else {
      return Promise.resolve()
    }
}

