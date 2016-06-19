import Vue from 'vue'


//Pass in an ISO Date String
Vue.filter('timeSince', function(value){
  var date = new Date(value);
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  } else if(interval == 1){
    return interval + " year ago";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  } else if(interval == 1){
    return interval + " month ago";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  } else if(interval == 1){
    return interval + " day ago";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  } else if(interval == 1){
    return interval + " hour ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  } else if(interval == 1){
    return interval + " minute ago";
  }

  return "just now";
})
