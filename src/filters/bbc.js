import Vue from 'vue'

Vue.filter('bbc', function(value, truncate){
  if(value){
    if(truncate){
      let _val = parseInt(value);
      let val;
      if( (val = _val / 1000000000) >= 1){ // billion
        return '' + val.toFixed(2) + 'b';
      } else if( (val = _val / 1000000) >= 1) { // million
        return '' + val.toFixed(2) + 'm';
      } else {
        return value.toLocaleString();
      }
    } else {
      return value.toLocaleString();
    }
  } else {
    return value;
  }
})
