<template>
  <div class="setters-page">
    Setters
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'

 export default BaseComponent.extend({
   name: 'SettersPage',
   components: {

   },
   data(){
     return {
       profile: UserModel.currentUser
     }
   },
   created(){

   },

   ready(){
     this.notifications.notify("Navbar.setHeader", "Setters");
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

 .setters-page {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   margin-top: $page-margin-top;

 }

</style>
