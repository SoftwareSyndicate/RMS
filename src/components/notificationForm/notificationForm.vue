<template>
  <div class="notification-form">
    <div class="form-header">
      <div class="avatar">

      </div>
      <div class="user-dropdown">
        {{user.first_name + " " + user.last_name}}
      </div>
      <div class="date">
        {{currentDateString}}
      </div>
    </div>
    <div class="form-body">
      <textarea placeholder="Type a message..." v-model="notif.text"></textarea>
    </div>
    <div class="form-footer">
      <div class="form-icons">
        <div class="form-icon" v-bind:class="{'active': notif.type == 'text'}" @click="notif.type = 'text'">
          <i class="material-icons">text_format</i>
        </div>
        <div class="form-icon" v-bind:class="{'active': notif.type == 'video'}" @click="notif.type = 'video'">
          <i class="material-icons">videocam</i>
        </div>
        <div class="form-icon" v-bind:class="{'active': notif.type == 'photo'}" @click="notif.type = 'photo'">
          <i class="material-icons">insert_photo</i>
        </div>
        <div class="form-icon wall-tag" v-bind:class="{'active': notif.type == 'wall'}" @click="notif.type = 'wall'">
          wall
        </div>
      </div>
      <div class="btn btn-primary" @click="createNotification(notif)">
        Send
      </div>
    </div>
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
       default: () => {}
     },
     createNotification: {},
     user: {
       type: Object,
       default: () => {}
     }
   },
   data(){
     return {
       currentDateString: ""
     }
   },
   created(){
     let options = {year: 'numeric', day: 'numeric', month: 'short'};
     let now = new Date();
     this.currentDateString = now.toLocaleDateString('en-US', options);
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
 @import '../../styles/vars.scss';

 .notification-form {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   border: $default-thin-border;

   .form-header {
     display: flex;
     flex-grow: 1;
     flex-basis: 100%;
     padding: 1em;
     align-items: center;
     border-bottom: $default-thin-border;

     .avatar {

     }

     .user-dropdown {

     }

     .date {
       margin-left: auto;
       font-size: .8em;
       color: rgba(0, 0, 0, .75);
     }
   }

   .form-body {
     display: flex;
     flex-grow: 1;
     flex-basis: 100%;
     border-bottom: $default-thin-border;

     textarea {
       flex-basis: 100%;
       min-height: 100px;
       padding: 1em;
       font-size: .9em;
       resize: none;
     }

   }

   .form-footer {
     display: flex;
     flex-grow: 1;
     flex-basis: 100%;
     padding: 1em;
     background-color: $color-background;

     .btn {
       margin-left: auto;
       font-size: 12px;
       height: 15px;
       padding-top: 4px;
       padding-bottom: 4px;
     }

     .form-icons {
       display: flex;
       align-items: center;

       .form-icon {
         height: 24px;
         padding-right: 1.5em;
         color: rgba(0, 0, 0, .2);

         &.active {
           color: $color-2;
         }
       }

       .wall-tag {
         display: flex;
         align-items: center;
         height: 24px;
         background-color: rgba(0, 0, 0, .2);
         color: white;
         font-size: 14px;
         padding-right: .4em;
         padding-left: .4em;

         &.active {
           background-color: $color-2;
           color: white;
         }
       }
     }
   }
 }

</style>
