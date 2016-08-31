<template>
  <div class="gym-page">
    <div class="route-pie-chart-container">
      <!-- <route-pie-chart :routes="routes"></route-pie-chart> -->
    </div>

    <div class="route-dist-container">
      <!-- <route-dist :routes="routes"></route-dist> -->
    </div>

  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import GymModel from 'models/GymModel'
 import RouteModel from 'models/RouteModel'

 /* import RoutePieChart from '../../SBP/src/components/routePieChart/routePieChart.vue'
    import RouteDist from '../../SBP/src/components/routeDist/routeDist' */

 export default BaseComponent.extend({
   name: 'GymPage',
   components: {
     /* RoutePieChart: RoutePieChart,
        RouteDist: RouteDist */
   },
   data(){
     return {
       routes: []
     }
   },
   created(){

   },

   ready(){
     this.routes = RouteModel.routes;
     this.gym = GymModel.currentGym;
     this.notifications.notify("Navbar.setHeader", this.gym.name);
   },

   notifs(){
     return {
       "GymModel.currentGymUpdated": 'onGymUpdated',
       "RouteModel.routesUpdated": 'onRouteUpdated'
     }
   },

   beforeDestroy(){

   },

   methods: {
     onGymUpdated(){
       this.gym = GymModel.currentGym;
       if(this.gym){
         this.notifications.notify("Navbar.setHeader", this.gym.name);
       }
     },

     onRoutesUpdated(){
       this.routes = RouteModel.routes;
     }
   }
 });

</script>


<style lang="scss">
 @import '../../styles/main.scss';

 .gym-page {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   margin-top: $page-margin-top;

   .btn {
     margin-left: auto;
     margin-bottom: 2em;
   }

 }

</style>
