<template>
  <div class="navbar">
    <div class="navbar-wrapper">
      <div class="logo">
        RMS
      </div>
      <div class="list" v-show="!currentUser">
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

     }
   },
   methods: {
     initNavItems(){
       if(!this.currentUser){
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

       }
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
     flex-grow: 1;
     align-items: center;
     margin-right: 10%;
     margin-left: 10%;

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
