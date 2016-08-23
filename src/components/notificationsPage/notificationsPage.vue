<template>
  <div class="notifications-page">
    <div class="notification-form-container">
      <h4>Share a new update with your members</h4>
      <notification-form :notif="newNotif" :create-notification="createNotification" :user="currentUser"></notification-form>
      <div class="filler">&nbsp</div>
    </div>
    <div class="notification-list-container">
      <h4>Latest Notifications</h4>
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
       newNotif: {
         type: "text",
         text: ""
       },
       currentUser: UserModel.currentUser
     }
   },
   created(){
     this.notifs = NotificationModel.notifications;
   },

   ready(){
     $("#wrapper").width("100%");
     this.notifications.notify("Navbar.setHeader", "Notifications");
   },
   beforeDestroy(){
     $("#wrapper").width("90%");
   },
   notifs(){
     return {
       "NotificationModel.notificationsUpdated": "onNotificationsUpdated"
     }
   },
   methods: {
     onNotificationsUpdated(e){
       this.notifs = NotificationModel.notifications;
       console.log(this.notifs);
     },

     createNotification(notification){
       NotificationModel.createNotification(this.currentUser.id, this.currentUser.first_name, this.currentUser.last_name, window.gymId,  notification.type, notification.text, notification.link, notification.video, notification.wallId);

       this.newNotif = {
         type: "text",
         text: ""
       }
     }
   }
 });

</script>


<style lang="scss">
 @import '../../styles/main.scss';

 .notifications-page {
   display: flex;
   flex-direction: row;
   flex-grow: 1;
   align-items: flex-start;

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
     height: 100%;

     .notification-form {

     }

     .filler {
       height: 100%;
     }
   }

   .notification-list-container {
     display: block;
     flex-basis: 35%;
     flex-wrap: wrap;
     padding: 3em 3em 3em 3em;

   }

 }

</style>
