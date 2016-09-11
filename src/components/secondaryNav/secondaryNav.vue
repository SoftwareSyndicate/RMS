<template>
  <div class="secondaryNav" :class="{'shadow': shadow}">
    <div class="navbar-wrapper">
      <div class="nav-items">
        <div class="nav-item" v-for="navItem in navItems" :class="{'active': navItem.active}" @click="selectNavItem(navItem)">
          {{navItem.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'

 export default BaseComponent.extend({
   name: 'SecondaryNav',
   props: {
     navItems: {
       type: Array,
       default: () => []
     }
   },
   created(){

   },

   ready(){
     $("#wrapper").css("width", "100%");
   },

   beforeDestroy(){
     $("#wrapper").css("width", "90%");
   },

   methods: {
     selectNavItem(item){
       this.navItems.forEach(navItem => {
         if(item == navItem){
           navItem.active = true;
         } else {
           navItem.active = false;
         }
       });
     }
   }
 });

</script>


<style lang="scss">
 @import "../../styles/vars";
 @import "../../styles/animation";

 .secondaryNav {
   display: flex;
   flex-grow: 1;
   flex-basis: 100%;
   width: 100%;
   height: 60px;
   color: $color-text-primary;
   background-color: rgba(248, 249, 255, 1);
   /* border-bottom: 2px solid darken(rgba(248, 249, 255, 1), 8%); */
   transition: all 300ms;
   box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);

   .navbar-wrapper {
     display: flex;
     align-items: center;
     width: $max-width;
     margin-left: auto;
     margin-right: auto;

     .nav-items {
       height: 100%;
       display: flex;
       align-items: center;

       .nav-item {
         border-radius: 25px;
         color: rgba(0, 0, 0, .4);
         cursor: pointer;
         display: flex;
         align-items: center;
         padding: 7px 13px 7px 13px;
         font-weight: 400;
         font-size: 14px;
         margin-right: 30px;

         &.active {
           box-shadow: 0 2px 3px 0 rgba(0,0,0,0.08),0 1px 1px 0 rgba(0,0,0,0.08);
           background-color: rgba(229, 231, 246, 1);
           color: rgba(0, 0, 0, .8);
         }

         &:hover {
           box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08),0 1px 1px 0 rgba(0,0,0,0.08);
           background-color: rgba(229, 231, 246, 1);
           color: rgba(0, 0, 0, .8);
         }
       }
     }
   }

   &:not(.shadow){
     box-shadow: none !important;
   }
 }

</style>
