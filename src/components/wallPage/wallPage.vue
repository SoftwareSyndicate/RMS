<template>
  <div class="walls-page">
    <div class="btn btn-primary create add-route-button" @click.stop="createRoute()">Add Route<i class="material-icons">add_box</i></div>
    <div class="route-list-container">
      <route-list :routes=routes :delete-route="deleteRoute"></route-list>
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
     this.getResources();
   },

   notifs(){
     return {
       "RouteListItem.colorSelected": "onColorSelected",
       "RouteListItem.statusSelected": "onStatusSelected",
       "RouteListItem.riceSelected": "onRiceSelected",
       "WallModel.currentWallUpdated": 'onWallUpdated',
       "RouteModel.routesUpdated": 'onRoutesUpdated',
       "GymModel.currentGymUpdated": 'onGymUpdated'
     }
   },
   methods: {
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

     onGymUpdated(){
       this.gym = GymModel.currentGym;
       console.log(this.gym);
     },

     onWallUpdated(){
       this.wall = WallModel.currentWall;
       this.notifications.notify("Navbar.setHeader", this.wall.name);
     },

     onRoutesUpdated(){
       console.log(this.routes);
       this.routes = RouteModel.routes;
     },

     getResources(){
       GymModel.watchGym("-KLi8WWAMzuH1k4mlkbj");        /* TODO remove this */
       WallModel.watchWall(this.$route.params.id);
       RouteModel.getRoutesByWallId(this.$route.params.id);
     }
   }
 });

</script>


<style lang="sass">
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
