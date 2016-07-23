<template>
  <div class="notifications-page">
    <div class="notification-form">
      <notification-form :notif="newNotif"></notification-form>
    </div>
    <div class="notification-list-container">
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
       notifs: {
         type: Array,
         default: () => []
       },
       
     }
   },
   created(){
     console.log(this.profile);
   },

   ready(){
     this.notifications.notify("Navbar.setHeader", "Notifications");
   },
   notifs(){
     return {

     }
   },
   methods: {
     signOut(){
       UserModel.signOut();
       this.$router.go({"name": "signIn"});
     }
   }
 });

</script>


<style lang="sass">
 @import '../../styles/main.scss';

 .notifications-page {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   margin-top: $page-margin-top;

   .notification-form {
     display: flex;
     flex-basis: 70%;
   }

   .notification-list {
     display: flex;
     flex-basis: 70%;

   }

 }

</style>
