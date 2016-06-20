<template>
  <div class="navbar">
    <div class="navbar-wrapper">
      <div class="logo">
        RMS
      </div>
      <div class="list">
        <div class="item" v-for="item in navItems" v-link="{name: item.route}">
          {{item.display}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'

 export default BaseComponent.extend({
   name: 'Navbar',
   components: {

   },
   data(){
     return {
       currentUser: UserModel.currentUser,
       navItems: []
     }
   },
   created(){
     this.initNavItems();
   },

   notifs(){
     return {
       "UserModel.userLogin": "onUserLogin",
       "Navbar.setItems": "setNavItems"
     }
   },
   methods: {
     initNavItems(){
       this.navItems = [];
       if(this.currentUser){
         this.navItems.push(
           {
             display: "Setters",
             route: "setters",
             auth: "admin"
           },
           {
             display: "Walls",
             route: "walls",
             auth: "setter"
           },
           {
             display: "Gym",
             route: "gym",
             auth: "setter"
           }
         );
       } else {
         this.navItems.push({
           display: "Sign Up",
           route: "signUp",
           auth: "none"
         })
       }
     },

     onUserLogin(e, user){
       this.currentUser = UserModel.currentUser;
       this.initNavItems();
     },

     setNavItems(e, items){
       this.navItems = items;
     }
   }
 });

</script>


<style lang="sass">
 @import "../../styles/vars";
 @import "../../styles/animation";

 .navbar {
   display: flex;
   flex-grow: 1;
   flex-basis: 100%;
   width: 100%;
   position: fixed;
   height: $navbar-height;
   background-color: $color-navbar-background;


   .navbar-wrapper {
     display: flex;
     align-items: center;
     width: $max-width;
     margin: auto;

     .logo {
       font-weight: 300;
       font-size: 30px;
     }

     .list {
       height: 100%;
       display: flex;
       align-items: center;
       margin-left: auto;

       .item {
         cursor: pointer;
         height: 100%;
         display: flex;
         align-items: center;
         padding-right: 20px;
         padding-left: 20px;
       }
     }
   }
 }

</style>
