<template>
  <div class="text-notification-item">
    <div class="notif-header">
      <div class="author">
        {{notif.first_name + " " + notif.last_name}}
      </div>
      <div class="date">
        {{notif.created_at | timeSince}}
      </div>
    </div>
    <div class="notif-body">
      {{notif.text}}
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'

 export default BaseComponent.extend({
   name: 'TextNotificationItem',
   props: {
     notif: {
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

 .text-notification-item {
   flex-basis: 100%;
   display: flex;
   flex-wrap: wrap;
   flex-basis: 100%;
   border: 2px solid rgba(0, 0, 0, .1);
   background-color: white;

   .notif-header {
     padding: 1rem;
     margin-bottom: 1rem;
     display: flex;
     flex-basis: 100%;
     border-bottom: 2px solid rgba(0, 0, 0, .1);
     justify-content: center;

     .author {

     }

     .date {
       margin-left: auto;
     }
   }

   .notif-body {
     padding: 1rem;
     margin-bottom: 1rem;
     display: flex;
     flex-basis: 100%;
   }
 }

</style>
