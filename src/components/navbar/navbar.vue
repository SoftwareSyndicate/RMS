<template>
  <div class="navbar" :class="{'shadow': shadow}">
    <div class="navbar-wrapper">
      <div class="logo">
        {{header}}
      </div>
      <div class="list">
        <div class="item" v-for="item in navItems" v-link="{name: item.route}" v-bind:class="{'active': item.route === currentRoute}">
          {{item.display}}
        </div>
      </div>
      <div class="user-icon" v-link="{name: 'profile'}" v-bind:class="{'active': 'profile' === currentRoute}" v-if="currentUser">
        <i class="material-icons">person</i>
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
       header: "RMS",
       currentUser: UserModel.currentUser,
       navItems: [],
       currentRoute: this.$route.name,
       shadow: false
     }
   },
   created(){

   },

   ready(){
     this.initNavItems();
     $('body').on('wheel.navbar touchmove.navbar', this.onScroll());
     this.onScroll()();
   },
   notifs(){
     return {
       "UserModel.userUpdated": "onUserUpdated",
       "Navbar.setItems": "setNavItems",
       "Router.afterTransition": "initNavItems",
       "Navbar.setHeader": "setHeader"
     }
   },
   methods: {
     setHeader(e, header){
       this.header = header;
     },

     initNavItems(){
       this.currentRoute = this.$route.name;
       this.navItems = [];
       if(this.currentUser){
         this.navItems.push(
           {
             display: "Walls",
             route: "walls",
             auth: "setter",
             icon: "dns"
           },
           {
             display: "Users",
             route: "users",
             auth: "admin",
             icon: "supervisor_account"
           },
           {
             display: "Gym",
             route: "gym",
             auth: "admin",
             icon: "business"
           },
           {
             display: "Notifications",
             route: "notifications",
             auth: "admin",
             icon: "add_alert"
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

     onUserUpdated(e, user){
       this.currentUser = UserModel.currentUser;
       this.initNavItems();
     },

     setNavItems(e, items){
       this.navItems = items;
     },
     onScroll(){
       let self = this;
       return function(){
         let body = $(this);
         if(body.scrollTop() > 5){
           self.shadow = true;
         } else {
           self.shadow = false;
         }
       }
     }
   }
 });

</script>


<style lang="scss">
 @import "../../styles/vars";
 @import "../../styles/animation";

 .navbar {
   z-index: 9;
   display: flex;
   flex-grow: 1;
   flex-basis: 100%;
   width: 100%;
   position: fixed;
   height: $navbar-height;
   color: $color-text-primary;
   background-color: $color-navbar-background;
   border-bottom: 2px solid darken($color-navbar-background, 4%);
   transition: all 300ms;
   box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);

   .navbar-wrapper {
     display: flex;
     align-items: center;
     width: $max-width;
     margin-left: auto;
     margin-right: auto;

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

         i {
           font-size: 20px;
           margin-right: 8px;
         }


         &.active {
           background-color: darken($color-navbar-background, 6%);
         }

         &:hover {
           background-color: darken($color-navbar-background, 6%);
         }
       }
     }

     .user-icon {
       cursor: pointer;
       display: flex;
       align-items: center;
       height: 100%;
       padding-left: 22px;
       padding-right: 22px;

       &:hover {
         background-color: darken($color-navbar-background, 6%);
       }

       &.active {
         background-color: darken($color-navbar-background, 6%);
       }

       i {
         height: 24px;
         font-size: 24px;
       }
     }
   }

   &:not(.shadow){
     box-shadow: none !important;
   }
 }

</style>
