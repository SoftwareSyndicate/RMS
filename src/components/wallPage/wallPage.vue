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
       wall: null
     }
   },
   created(){
     this.getResources();
   },

   notifs(){
     return {
       "WallModel.currentWallUpdated": 'onWallUpdated'
     }
   },
   methods: {
     createRoute(){
       
     },

     onWallUpdated(){
       this.wall = WallModel.currentWall;
       this.notifications.notify("Navbar.setHeader", this.wall.name);
     },

     getResources(){
       WallModel.watchWall(this.$route.params.id);
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
