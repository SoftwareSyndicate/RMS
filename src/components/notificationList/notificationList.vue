<template>
  <div class="notification-list">
    notifications list
    <div v-for="notif in notifs">
      <text-notification-item  v-if="notif.type == 'text''" :notification="notif"></text-notification-item>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import TextNotificationItem from 'components/notificationItems/textNotificationItem'

 export default BaseComponent.extend({
   name: 'NotificationList',
   components: {
     TextNotificationItem: TextNotificationItem
   },
   props: {
     notifs: {
       type: Array,
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


<style lang="scss">
 @import '../../styles/main.scss';

 .gym-list {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
 }

</style>
