<template>
  <div class="users-page">
    USERS PAGE
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'

 export default BaseComponent.extend({
   name: 'UsersPage',
   components: {

   },
   data(){
     return {
       profile: UserModel.currentUser
     }
   },
   created(){
     console.log(this.profile);
   },

   ready(){
     this.notifications.notify("Navbar.setHeader", "Users");
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

 .users-page {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   margin-top: $page-margin-top;

   .person {
     display: flex;
     flex-wrap: wrap;
     justify-content: center;
     flex-basis: 40%;

     .img-container {
       display: flex;
       flex-basis: 100%;
       padding-bottom: 1em;

       img {
         height: 150px;
       }
     }

     .name {
       flex-basis: 100%;
       font-size: 2em;
       font-weight: 300;
       margin-bottom: .2em;
     }

     .email {
       flex-basis: 100%;
       font-size: 1em;
       font-weight: 300;
       margin-bottom: .5em;
     }

     .joined {
       flex-basis: 100%;
       font-size: 1em;
       font-weight: 300;
       margin-bottom: 1.5em;
     }

     .btn {
       margin-right: auto;
     }
   }

   .info {
     display: flex;
     flex-basis: 60%;
     flex-grow: 1;
   }
 }

</style>
