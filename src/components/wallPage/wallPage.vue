<template>
  <div class="walls-page">
    <div class="btn btn-primary add-route-button" @click.stop="createRoute()">Add Route<i class="material-icons">add_box</i></div>
    <div class="route-list-container">
      <route-list :routes=routes></route-list>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'
 import GymModel from 'models/GymModel'
 import WallModel from 'models/WallModel'
 import RouteModel from 'models/RouteModel'

 import RouteList from 'components/routeList/routeList'

 export default BaseComponent.extend({
   name: 'WallsPage',
   components: {
     RouteList: RouteList
   },
   data(){
     return {
       wall: {},
       routes: []
     }
   },
   created(){
     this.getResources();
   },

   notifs(){
     return {
       "WallModel.currentWallUpdated": 'onWallUpdated',
       "RouteModel.routesUpdated": 'onRoutesUpdated'
     }
   },
   methods: {
     createRoute(){
       //TODO remove this, all users should have a current Gym on Reg
       RouteModel.createRoute("-KLi8WWAMzuH1k4mlkbj", this.wall.id);
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
 }

</style>
