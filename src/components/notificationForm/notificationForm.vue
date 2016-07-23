<template>
  <div class="notification-form">
    notification FORM
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import TextNotificationItem from 'components/notificationItems/textNotificationItem'

 export default BaseComponent.extend({
   name: 'NotificationForm',
   components: {
     TextNotificationItem: TextNotificationItem
   },
   props: {
     notif: {
       type: Object,
       default: () => []
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
     createGym(){
       let now = new Date().getTime();
       let gym = {
         name: "Austin Bouldering Project",
         created_at: now,
         updated_at: now
       }
       GymModel.createGym(gym).then(results => {
         console.log("results:", results);

       });
     }
   }
 });

</script>


<style lang="sass">
 @import '../../styles/main.scss';

 .gym-list {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
 }

</style>
