<template>
  <div class="gym-page">
    <secondary-nav :nav-items.sync="navItems"></secondary-nav>
    <div class="wall-dist-container" v-show="navItems[0].active">
      <div class="header">
        <h3>Wall Distribution</h3>
      </div>
      <!-- <gym-route-distribution :routes="routes" :ideal-routes="idealRoutes" :circuits="circuits"></gym-route-distribution> -->
    </div>
    <div class="ideal-dist-container" v-show="navItems[1].active">
      <div class="header">
        <h3>Ideal Distribution: </h3><span>{{idealTotal}}</span>
      </div>
      <ideal-route-distribution :update="updateGym" :circuits.sync="circuits"></ideal-route-distribution>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import GymModel from 'models/GymModel'
 import RouteModel from 'models/RouteModel'

 import SecondaryNav from 'components/secondaryNav/secondaryNav'
 import GymRouteDistribution from 'components/gymRouteDistribution/gymRouteDistribution'
 import IdealRouteDistribution from 'components/idealRouteDistribution/idealRouteDistribution'

 export default BaseComponent.extend({
   name: 'GymPage',
   components: {
     SecondaryNav,
     GymRouteDistribution,
     IdealRouteDistribution
   },
   data(){
     return {
       routes: [],
       circuits: [],
       gym: {},
       idealTotal: 0,
       largestGrade: 0,
       navItems: [
         {
           name: "Route distribution",
           active: false
         },
         {
           name: "Ideal distribution",
           active: true
         }
       ]
     }
   },
   created(){

   },

   ready(){
     this.gym = GymModel.currentGym;
     if(this.gym){
       this.circuits = this.gym.circuits;
       this.notifications.notify("Navbar.setHeader", this.gym.name);
       this.calcLargestGrade(this.circuits);
       this.calcIdealTotals(this.circuits);
     }

     this.routes = RouteModel.routes;
   },

   notifs(){
     return {
       "GymModel.currentGymUpdated": 'onGymUpdated',
       "RouteModel.routesUpdated": 'onRoutesUpdated'
     }
   },

   beforeDestroy(){
     this.updateGym();
   },

   methods: {
     onGymUpdated(){
       this.gym = GymModel.currentGym;
       this.circuits = this.gym.circuits;
       this.notifications.notify("Navbar.setHeader", this.gym.name);
       this.calcLargestGrade(this.circuits);
       this.calcIdealTotals(this.circuits);
     },

     calcLargestGrade(circuits){
       this.largestGrade = 0;
       circuits.forEach(circuit => {
         if(circuit.end_range > this.largestGrade){
           this.largestGrade = circuit.end_range;
         }
       });
     },

     calcIdealTotals(circuits){
       this.idealTotal = 0;
       circuits.forEach(circuit => {
         for(var i = 0; i <= this.largestGrade; i++){
           this.idealTotal += parseInt(circuit['ideal_v' + i]);
         }
       });

       console.log(this.idealTotal);
     },

     onRoutesUpdated(){
       this.routes = RouteModel.routes;
     },

     updateGym(){
       GymModel.updateGym(this.gym);
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
   margin-bottom: 2rem;

   .wall-dist-container {
     display: flex;
     flex-wrap: wrap;
     margin-left: auto;
     margin-right: auto;
     margin-top: 2rem;
     flex-basis: 90%;
     background-color: rgba(255, 255, 255, 0.98);
     min-height: 70vh;
     border: $default-border;
     justify-content: center;

     .header {
       display: flex;
       flex-basis: 100%;
       border-bottom: $default-border;
       height: 60px;
       align-items: center;
       padding-left: 1rem;
       flex-grow: 0;

       h3 {
         font-weight: 400;
         font-size: 14px;
         color: $color-text-dark;
       }
     }

     .gym-route-distribution {
       display: flex;
       flex-grow: 1;
       flex-basis: 100%;
     }
   }


   .ideal-dist-container {
     display: flex;
     flex-wrap: wrap;
     margin-left: auto;
     margin-right: auto;
     margin-top: 2rem;
     flex-basis: 90%;
     background-color: rgba(255, 255, 255, 0.98);
     border: $default-border;

     .header {
       display: flex;
       flex-basis: 100%;
       border-bottom: $default-border;
       height: 60px;
       align-items: center;
       padding-left: 1rem;
       flex-grow: 0;

       h3 {
         font-weight: 400;
         font-size: 14px;
         color: $color-text-dark;
         margin-right: 1rem;
       }

       span {
         color: $color-navbar-background;
       }
     }

     .gym-route-distribution {
       display: flex;
       flex-grow: 1;
       flex-basis: 100%;
     }
   }
 }

</style>
