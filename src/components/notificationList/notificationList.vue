<template>
  <div class="notification-list">
    <div v-for="notif in notifs">
      <text-notification-item  v-if="notif.type == 'text'" :notification="notif"></text-notification-item>
      <wall-notification-item  v-if="notif.type == 'wall'" :notification="notif"></wall-notification-item>
      <video-notification-item  v-if="notif.type == 'video'" :notification="notif"></video-notification-item>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import TextNotificationItem from 'components/notificationItems/textNotificationItem'
 import WallNotificationItem from 'components/notificationItems/wallNotificationItem'
 import VideoNotificationItem from 'components/notificationItems/videoNotificationItem'

 export default BaseComponent.extend({
   name: 'NotificationList',
   components: {
     TextNotificationItem: TextNotificationItem,
     WallNotificationItem: WallNotificationItem,
     VideoNotificationItem: VideoNotificationItem
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
