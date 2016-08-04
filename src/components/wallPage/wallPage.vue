<template>
  <div class="walls-page">
    <div class="btn btn-primary create add-route-button" @click.stop="createRoute()">Add Route<i class="material-icons">add_box</i></div>
    <div class="route-list-container">
      <route-list :routes.sync="wall.routes" :delete-route="deleteRoute"></route-list>
    </div>

    <color-select-modal :show.sync="showColorModal" :route.sync="currentRoute" :circuits="gym.circuits"></color-select-modal>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'
 import GymModel from 'models/GymModel'
 import WallModel from 'models/WallModel'
 import RouteModel from 'models/RouteModel'

 import RouteList from 'components/routeList/routeList'
 import ColorSelectModal from 'components/colorSelectModal/colorSelectModal'

 export default BaseComponent.extend({
   name: 'WallsPage',
   components: {
     RouteList: RouteList,
     ColorSelectModal: ColorSelectModal
   },
   data(){
     return {
       wall: {},
       routes: [],
       currentRoute: {},
       showColorModal: false,
       showStatusModal: false,
       showRiceModal: false,
       gym: {}
     }
   },
   created(){
     this.onWallsUpdated();
   },

   notifs(){
     return {
       "ColorSelectModal.routeUpdated": "onRouteUpdated",
       "RouteListItem.colorSelected": "onColorSelected",
       "RouteListItem.statusSelected": "onStatusSelected",
       "RouteListItem.riceSelected": "onRiceSelected",
       "WallModel.wallsUpdated": 'onWallsUpdated',
       "RouteModel.routesUpdated": 'parseRoutes',
       "GymModel.currentGymUpdated": 'onGymUpdated'
     }
   },
   methods: {
     parseRoutes(){
       this.wall.routes = [];
       RouteModel.routes.forEach(route => {
         route.sent = false;
         route.grade = route.grade;
         route.actualColor = window.colorMappings[route.color];
         route.colorValue = this.findColorIndex(route.actualColor);

         if(route.wall_id === this.wall.id){
           this.wall.routes.push(route);
         }
       });
       this.wall.routes = this.sortRoutes(this.wall.routes);
     },

     onColorSelected(e, route){
       this.currentRoute = route;
       this.showColorModal = true;
     },
     onStatusSelected(e, route){
       this.currentRoute = route;

     },
     onRiceSelected(e, route){
       this.currentRoute = route;
     },

     createRoute(){
       /* TODO remove this, all users should have a current Gym on Reg */
       RouteModel.createRoute("-KLi8WWAMzuH1k4mlkbj", this.wall.id);
     },

     deleteRoute(id){
       RouteModel.deleteRoute(id);
     },

     onRouteUpdated(e, route){
       RouteModel.updateRoute(route);
     },

     onGymUpdated(){
       this.gym = GymModel.currentGym;
     },

     onWallsUpdated(){
       this.walls = WallModel.walls;
       WallModel.walls.forEach(wall => {
         if(wall.id === this.$route.params.id){
           this.wall = wall;
         }
       });
       this.notifications.notify('Navbar.setHeader', this.wall.name);
       this.parseRoutes();
     },

     onRoutesUpdated(){
       this.routes = RouteModel.routes;
     },

     sortRoutes(routes){
       routes.sort(function(a, b) {
         if(a.grade > b.grade){
           return 1;
         } else if(a.grade < b.grade) {
           return -1;
         } else {
           return 0;
         }
       });

       routes.sort(function(a, b){
         if(a.colorValue > b.colorValue){
           return 1;
         } else if(a.colorValue < b.colorValue){
           return -1;
         } else {
           return 0;
         }
       });
       routes.reverse();
       return routes;
     },

     findColorIndex(color){
       var value;
       switch(color){
         case "rgba(209,209,209, 0.8)":
           value = 0;
           break;
         case "rgba(255,210,28, 0.8)":
           value = 1;
           break;
         case "rgba(5,179,99, 0.9)":
           value = 2;
           break;
         case "rgba(243,23,38, 0.8)":
           value = 3;
           break;
         case "rgba(48,99,245, 0.8)":
           value = 4;
           break;
         case "rgba(252,109,33, 0.8)":
           value = 5;
           break;
         case "rgba(183,22,229,0.8)":
           value = 6;
           break;
         case "rgba(33,33,33,0.9)":
           value = 7;
           break;
       }
       return value;
     }
   }
 });

</script>


<style lang="scss">
 @import '../../styles/main.scss';

 .walls-page {
   display: flex;
   flex-wrap: wrap;

   .route-list-container {
     flex-basis: 100%;
   }

   .btn {
     margin-bottom: 1em;
   }
 }

</style>
