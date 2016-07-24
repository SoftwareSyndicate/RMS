<template>
  <div class="notification-form component">
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
       default: () => {}
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


<style lang="sass">
 @import '../../styles/main.scss';

 .notification-form {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   padding: 1em;
 }

</style>
