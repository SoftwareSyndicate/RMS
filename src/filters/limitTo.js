import Vue from 'vue'

Vue.filter('limitTo', function(arr, limit){
  if(arr){
    return arr.slice(0, Number(limit));
  } else {
    return;
  }
})
