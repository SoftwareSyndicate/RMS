<template>
  <div class="video-notification-item">
    <iframe :src="'https://www.youtube.com/embed/' + notification.video" frameborder="0"> </iframe>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'

 export default BaseComponent.extend({
   name: 'VideoNotificationItem',
   props: {
     notification: {
       type: Object,
       default: {}
     }
   },
   data(){
     return {

     }
   },
   created(){

   },
   ready(){

   },

   notifs(){
     return {

     }
   },
   methods: {

   }
 });

</script>


<style lang="scss">
 @import '../../styles/main.scss';

 .video-notification-item {
   padding: 1em;
   margin-bottom: 1em;
   flex-basis: 100%;
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   border: $default-border;
   background-color: $color-sub-container;

   &:hover {
     background-color: darken($color-sub-container, 4%);
   }
 }

</style>
