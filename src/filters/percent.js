import Vue from 'vue'

Vue.filter('percent', function(value, isWhole){
  if(typeof value === 'number'){
    let val = Math.abs(value);
    let sign = value < 0 ? '-':'+';

    if(!isWhole){
      val*=100;
    }

    return `${sign} ${val}%`;
  }
  return value;
})
