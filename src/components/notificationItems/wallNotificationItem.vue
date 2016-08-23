<template>
  <div class="wall-notification-item">
    <div class="notif-header">
      <div class="author">
        {{notif.first_name + " " + notif.last_name}}
      </div>
      <div class="date">
        {{notif.created_at | timeSince}}
      </div>
    </div>
    <div class="notif-body">
      <div class="wall-container">
        <wall-list-item :wall="wall"></wall-list-item>
      </div>
      <div class="notif-text">
        {{notif.text}}
      </div>
    </div>
  </div>

</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import WallListItem from '../../SBP/src/components/wallList/wallListItem'

 import WallModel from 'models/WallModel'
 import RouteModel from 'models/RouteModel'

 export default BaseComponent.extend({
   name: 'WallNotificationItem',
   components: {
     WallListItem: WallListItem
   },
   props: {
     notif: {
       type: Object,
       default: {}
     }
   },
   data(){
     return {
       wall: {},
       walls: []
     }
   },
   created(){
     this.onWallsUpdated();
   },
   notifs(){
     return {
       "WallModel.wallsUpdated": "onWallsUpdated",
       "RouteModel.routesUpdated": "parseRoutes"
     }
   },

   ready(){

   },

   methods: {
     onWallsUpdated(e){
       this.walls = WallModel.walls;
       this.parseRoutes();
     },

     parseRoutes(){
       this.walls.forEach(wall => {
         if(this.notif.wall_id == wall.id){
           wall.routes = [];
           RouteModel.routes.forEach(route => {
             if(route.wall_id === wall.id){
               wall.routes.push(route);
             }
           });
           this.wall = wall;
           console.log(this.wall);
         }
       });
     }

   }
 });

</script>


<style lang="scss">

 .wall-notification-item {
   flex-basis: 100%;
   display: flex;
   flex-wrap: wrap;
   flex-basis: 100%;
   border: 2px solid rgba(0, 0, 0, .1);
   background-color: white;

   .notif-header {
     padding: 1rem;
     margin-bottom: 1rem;
     display: flex;
     flex-basis: 100%;
     border-bottom: 2px solid rgba(0, 0, 0, .1);
     justify-content: center;

     .author {

     }

     .date {
       margin-left: auto;
     }
   }

   .notif-body {
     padding: 1rem;
     margin-bottom: 1rem;
     display: flex;
     flex-basis: 100%;
     flex-wrap: wrap;

     .wall-container {
       flex-basis: 100%;
       margin-bottom: 1rem;
     }

     .notif-text {
       flex-basis: 100%;
     }
   }
 }

</style>
