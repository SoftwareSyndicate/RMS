<template>
  <div class="notification-list">
    <div class="notification-container" v-for="notif in notifs">
      <text-notification-item  v-if="notif.type == 'text'" :notif="notif"></text-notification-item>
      <wall-notification-item  v-if="notif.type == 'wall'" :notif="notif"></wall-notification-item>
      <video-notification-item  v-if="notif.type == 'video'" :notif="notif"></video-notification-item>
    </div>
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

   }
 });

</script>


<style lang="scss">

 .notification-list {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;

   .notification-container {
     display: flex;
     flex-basis: 100%;
     margin-bottom: 1rem;
   }
 }

</style>
