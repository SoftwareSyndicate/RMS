import Vue from 'vue'

Vue.filter('epass', function(handler, ...args) {
  return function() {
    handler()(...arguments, ...args);
  }
});
