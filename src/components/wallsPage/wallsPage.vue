<template>
  <div class="walls-page">
    <div class="btn btn-primary add-gym-button" @click.stop="createWall()">Add Wall<i class="material-icons">add_box</i></div>
    <div class="wall-list-container">
      <wall-list :walls="walls"></wall-list>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'
 import WallModel from 'models/WallModel'
 import RouteModel from 'models/RouteModel'

 import WallList from '../../SBP/src/components/wallList/wallList.vue'

 export default BaseComponent.extend({
   name: 'WallsPage',
   components: {
     WallList: WallList
   },
   data(){
     return {
       walls: []
     }
   },
   created(){

   },
   ready(){
     this.notifications.notify("Navbar.setHeader", "Walls");
     this.onWallsUpdated();
   },

   notifs(){
     return {
       "WallModel.wallsUpdated": "onWallsUpdated",
       "RouteModel.routesUpdated": "parseRoutes"
     }
   },
   methods: {
     createWall(){
       console.log("createWall");
       //TODO remove this, all users should have a current Gym on Reg
       if(UserModel.currentUser.currentGymId){
         WallModel.createWall("F.S.1", UserModel.currentUser.currentGymId);
       } else {
         WallModel.createWall("North Slab", "-KLi8WWAMzuH1k4mlkbj");
       }
     },

     onWallsUpdated(e){
       this.walls = WallModel.walls;
       this.parseRoutes();
     },

     parseRoutes(){
       console.log("parse routes");
       console.log(RouteModel.routes);
       this.walls.forEach(wall => {
         wall.routes = [];
         RouteModel.routes.forEach(route => {
           if(route.wall_id === wall.id){
             wall.routes.push(route);
           }
         });
       });
     }
   }
 });

</script>


<style lang="sass">
 @import '../../styles/main.scss';

 .walls-page {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   margin-top: $page-margin-top;

   .btn {
     margin-left: auto;
     margin-bottom: 1em;
     min-width: 8em;
   }

   .wall-list-container {
     flex-basis: 100%;
     display: flex;
     flex-wrap: wrap;
     flex-grow: 1;

     .wall-list {
       flex-grow: 1;
       flex-wrap: wrap;
       display: flex;
       justify-content: space-between;

       @media (max-width: $large-screen) {

       }

     }

     .wall-list-item {
       flex-basis: 100%;
       flex-grow: 1;

       @media (min-width: $large-screen) {
         flex-grow: 0;
         flex-basis: 47%;

       }

     }
   }

 }

</style>
