<template>
  <div class="notifications-page">
    <div class="notification-form-container">
      <h4>Share a new update with your members</h4>
      <notification-form :notif="newNotif"></notification-form>
    </div>
    <div class="notification-list-container">
      <h4>Latest updates</h4>
      <notification-list :notifs="notifs"></notification-list>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'
 import NotificationModel from 'models/NotificationModel'

 import NotificationList from 'components/notificationList/notificationList'
 import NotificationForm from 'components/notificationForm/notificationForm'

 export default BaseComponent.extend({
   name: 'NotificationsPage',
   components: {
     NotificationList: NotificationList,
     NotificationForm: NotificationForm
   },
   data(){
     return {
       notifs: [],
       newNotifs: {}
     }
   },
   created(){
     console.log(this.profile);
     $("#wrapper").width("100%");
   },

   ready(){
     this.notifications.notify("Navbar.setHeader", "Notifications");
   },
   beforeDestroy(){
     $("#wrapper").width("90%");
   },
   notifs(){
     return {

     }
   },
   methods: {
     createNotification(){

     }
   }
 });

</script>


<style lang="sass">
 @import '../../styles/main.scss';

 .notifications-page {
   display: flex;
   flex-grow: 1;

   h4 {
     flex-basis: 100%;
     font-weight: 300;
     font-size: 1.3em;
     margin-bottom: 1em;
     padding-bottom: .6em;
     border-bottom: $default-thin-border;
   }

   .notification-form-container {
     background-color: white;
     display: flex;
     flex-wrap: wrap;
     flex-basis: 65%;
     padding: 3em 3em 3em 3em;
     /* height: calc(100vh - 64px); */

     .notification-form {

     }
   }

   .notification-list-container {
     display: flex;
     flex-basis: 35%;
     flex-wrap: wrap;
     padding: 3em 3em 3em 3em;

   }

 }

</style>
