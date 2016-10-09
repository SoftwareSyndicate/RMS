/* Firebase API */

const api = firebase;

function fetch (child) {
  if (cache && cache.has(child)) {
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve, reject) => {
      api.child(child).once('value', snapshot => {
        const val = snapshot.val()
          // mark the timestamp when this item is cached
          if (val) val.__lastUpdated = Date.now()
          cache && cache.set(child, val)
          resolve(val)
      }, reject)
    })
  }
}

export function fetchIdsByType (type) {
  return api.__ids__ && api.__ids__[type]
       ? Promise.resolve(api.__ids__[type])
    : fetch(`${type}stories`)
}

/* Gyms */
export function fetchGym (id) {
  return fetch(`gyms/${id}`)
}

/* Walls */
export function fetchWall (id) {
  return fetch(`walls/${id}`)
}

export function fetchWalls (ids) {
  return Promise.all(ids.map(id => fetchWall(id)))
}

/* Users */
export function fetchUser (id) {
  return fetch(`user/${id}`)
}

export function fetchUsers (ids) {
  return Promise.all(ids.map(id => fetchUsers(id)))
}

export function watchList (type, cb) {
  let first = true
  const ref = api.child(`${type}stories`)
    const handler = snapshot => {
      if (first) {
        first = false
      } else {
        cb(snapshot.val())
      }
    }
  ref.on('value', handler)
    return () => {
      ref.off('value', handler)
    }
}
