import Vue from 'vue'

Vue.filter('reverse', function (value) {
  return value.slice().reverse();
  /* return value.split('').reverse().join('') */
})
