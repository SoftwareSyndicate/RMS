<template>
  <div class="wall-page">
    <div class="header">
      <div class="info">
        <div class="total-routes">
          Total: {{wall.routes.length}}
        </div>
        <div class="average-grade">
          Avg: {{Math.round((totalGrade / wall.routes.length) * 10) / 10}}
        </div>
      </div>
      <div class="right">
        <div class="btn btn-primary reset" @click.stop="openConfirmResetModal()"><i class="material-icons">repeat</i></div>
        <div class="btn btn-primary create add-route-button" @click.stop="createRoute()"><i class="material-icons">add_box</i></div>
      </div>
    </div>
    <div class="route-list-container">
      <route-list :routes.sync="wall.routes" :setters.sync="setters" :delete-route="deleteRoute"></route-list>
    </div>

    <color-select-modal :show.sync="showColorModal" :route.sync="currentRoute" :circuits="gym.circuits"></color-select-modal>
    <status-select-modal :show.sync="showStatusModal" :route.sync="currentRoute"></status-select-modal>
    <rice-select-modal :show.sync="showRiceModal" :route.sync="currentRoute"></rice-select-modal>
    <confirm-reset-modal :show.sync="showConfirmResetModal" :cb="resetWall"></confirm-reset-modal>
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
 import StatusSelectModal from 'components/statusSelectModal/statusSelectModal'
 import RiceSelectModal from 'components/riceSelectModal/riceSelectModal'
 import ConfirmResetModal from 'components/confirmResetModal/confirmResetModal'

 export default BaseComponent.extend({
   name: 'WallsPage',
   components: {
     RouteList: RouteList,
     ColorSelectModal: ColorSelectModal,
     StatusSelectModal: StatusSelectModal,
     RiceSelectModal: RiceSelectModal,
     ConfirmResetModal: ConfirmResetModal
   },
   data(){
     return {
       wall: {},
       routes: [],
       setters: [],
       currentRoute: {},
       totalGrade: 0,
       showColorModal: false,
       showStatusModal: false,
       showRiceModal: false,
       showConfirmResetModal: false,
       gym: {},
       oldRoutes: []
     }
   },
   created(){
     this.onWallsUpdated();
     this.gym = GymModel.currentGym;
     this.setters = UserModel.setters;

     this.$watch('wall', () => {
       if(this.updateTimeout){
         window.clearTimeout(this.updateTimeout);
       }
       this.updateTimeout = setTimeout(() => {
         this.wall.routes.forEach(route => {
           if(route.$dirty){
             delete route.$dirty;
             RouteModel.updateRoute(route);
           }
         });
       }, 2000);
     }, {
       deep: true
     });
   },

   notifs(){
     return {
       "RouteListItem.colorSelected": "onColorSelected",
       "RouteListItem.statusSelected": "onStatusSelected",
       "RouteListItem.riceSelected": "onRiceSelected",
       "WallModel.wallsUpdated": 'onWallsUpdated',
       "RouteModel.routesUpdated": 'parseRoutes',
       "GymModel.currentGymUpdated": 'onGymUpdated',
       "UserModel.settersUpdated": 'onSettersUpdated'
     }
   },
   methods: {
     parseRoutes(){
       console.log("parse routes");
       this.wall.routes = [];
       this.totalGrade = 0;
       RouteModel.routes.forEach(route => {
         route.sent = false;
         route.grade = route.grade;
         route.actualColor = window.colorMappings[route.color];
         route.colorValue = this.findColorIndex(route.actualColor);
         if(route.wall_id === this.wall.id){
           this.totalGrade += parseInt(route.grade);
           this.wall.routes.push(route);
         }
       });
       this.wall.routes = this.sortRoutes(this.wall.routes);
       console.log("wall.routes: ", this.wall.routes);
     },

     onColorSelected(e, route){
       this.currentRoute = route;
       this.showColorModal = true;
     },
     onStatusSelected(e, route){
       this.currentRoute = route;
       this.showStatusModal = true;
     },
     onRiceSelected(e, route){
       this.currentRoute = route;
       this.showRiceModal = true;
     },

     createRoute(){
       RouteModel.createRoute(window.gymId, this.wall.id);
     },

     deleteRoute(id){
       for(var i = 0; i < this.routes.length; i++){
         if(this.routes[i].id == id){
           this.routes.splice(i, 1);
         }
       }
       RouteModel.deleteRoute(id);
     },

     onGymUpdated(){
       this.gym = GymModel.currentGym;
     },

     onSettersUpdated(){
       this.setters = UserModel.setters;
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

     openConfirmResetModal(){
       this.showConfirmResetModal = true;
     },

     resetWall(confirm){
       if(confirm){
         this.showLoadingAnimation();
         setTimeout(() => {
           let newRoutes = WallModel.resetWall(this.wall);
           let now = new Date();
           this.wall.routes.forEach(route => {
             route.taken_down = now;
             RouteModel.updateRoute(route);
           });

           newRoutes.forEach(route => {
             RouteModel.createRoute(route.gym_id, route.wall_id, route.color, route.grade, 0, 0, 0, 0, route.htmlColor);
           });
         }, 50);
         setTimeout(()=> {
           for(let i = 0; i < this.wall.routes.length; i++){
             if(this.wall.routes[i].status != 0){
               this.wall.routes.splice(i, 1);
             }
           }
           this.hideLoadingAnimation();
         }, 1000);
       }
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

 .wall-page {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   margin: auto;
   margin-top: $page-margin-top;
   max-width: 90%;

   .route-list-container {
     flex-basis: 100%;
   }

   .header {
     display: flex;
     flex-grow: 1;
     align-items: center;
     margin-bottom: 1em;

     .info {
       font-size: 2rem;
       display: flex;
       align-items: center;

       .total-routes {
         font-size: 2rem;
         padding-right: 1rem;
         border-right: $default-border;
       }

       .average-grade {
         padding-left: 1rem;
       }
     }

     .right {
       margin-left: auto;
       display: flex;
       .btn {

         i {
           padding: 0;
         }
       }

       .reset {
         margin-right: 2rem;
       }
     }
   }

 }

</style>
