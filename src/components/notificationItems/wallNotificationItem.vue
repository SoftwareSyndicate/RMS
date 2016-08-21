<template>
  <div class="wall-notification-item">
    {{notif.name}}
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'

 export default BaseComponent.extend({
   name: 'WallNotificationItem',
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

 .wall-notification-item {
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
