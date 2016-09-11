<template>
  <div class="setter-list-item">
    setter
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'

 export default BaseComponent.extend({
   name: 'SetterListItem',
   props: {
     route: {
       type: Object,
       default: () => {},
       twoWay: true
     },
     setters: {
       type: Array,
       default: () => [],
       twoWay: true
     },
     deleteRoute: {}
   },
   components: {

   },
   data(){
     return {

     }
   },
   created(){

   },

   methods: {
     colorSelected(){
       this.notifications.notify("RouteListItem.colorSelected", this.route);
     },
     statusSelected(){
       this.notifications.notify("RouteListItem.statusSelected", this.route);
     },
     riceSelected(){
       this.notifications.notify("RouteListItem.riceSelected", this.route);
     }

   }
 });

</script>


<style lang="scss">
 @import '../../styles/vars.scss';

 .route-list-item {
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: .5em 2em .5em 2em;
   margin-bottom: 10px;

   .grade-container {
     display: flex;
   }

   .status-container {
     display: flex;

     .status {
       height: 20px;
       width: 20px;

       &.zero {
         height: 40px;
         width:  40px;
         border: solid 1px rgba(0, 0, 0, .1);
         box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
       }

       &.one {
         height: 40px;
         border-left: solid 10px rgba(0, 0, 0, .8);
       }

       &.two {
         height: 30px;
         width: 30px;
         border-left: solid 10px rgba(0, 0, 0, .8);
         border-bottom: solid 10px rgba(0, 0, 0, .8);
       }

       &.three {
         height: 30px;
         border-left: solid 10px rgba(0, 0, 0, .8);
         border-bottom: solid 10px rgba(0, 0, 0, .8);
         border-right: solid 10px rgba(0, 0, 0, .8);
       }

       &.four {
         border: solid 10px rgba(0, 0, 0, .8);
       }
     }
   }

   .setter-container {
     display: flex;
     flex-basis: 20%;
   }

   .rice-container {
     display: flex;
     justify-content: space-around;
     cursor: pointer;
     flex-basis: 15%;

     .rice {
       display: flex;
       flex-wrap: wrap;
       justify-content: center;

       span {
         text-align: center;
         flex-basis: 100%;
       }
     }

   }

   .notes-container {
     padding-right: .5em;
     padding-left: .5em;
     display: flex;
   }

   .remove-container {
     display: flex;

     .btn {
       margin-bottom: 0px;
       i {
         padding: 0;
       }
     }
   }
 }

</style>
