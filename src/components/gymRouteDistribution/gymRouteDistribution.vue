<template>
  <div class="gym-route-distribution">
    <div class="grades-container">
      <div class="grade" v-for="n in largestGrade" :class="{}">
        <div class="circuit" v-for="(circuitIndex, circuit) in circuits | reverse " :style="{'background-color': circuit.color}">
          <div class="route" v-for="(routeIndex, route) in routes" v-if="route.grade == n && route.color == circuit.name"></div>
        </div>

        {{$index}}
      </div>
      <div class="bottom">

      </div>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'

 export default BaseComponent.extend({
   name: 'GymRouteDistribution',
   props: {
     circuits: {
       type: Array,
       default: () => []
     },
     routes: {
       type: Array,
       default: () => []
     },
     idealRoutes: {
       type: Array,
       default: () => []
     }
   },
   data(){
     return {
       largestGrade: 0,
       grades: []
     }
   },
   created(){
     this.$watch('circuits', () => {
       this.parseGrades(this.circuits);
     });
     this.$watch('routes', () => {
       this.parseRoutes(this.routes);
     });

   },
   ready(){

   },

   notifs(){
     return {

     }
   },
   methods: {
     parseGrades(circuits){
       this.largestGrade = 0;
       circuits.forEach(circuit => {
         if(circuit.end_range > this.largestGrade){
           this.largestGrade = circuit.end_range;
         }
       });
       this.largestGrade++;
     },
     parseRoutes(routes){
       if(this.circuits.length > 0){

         routes.forEach(route => {
           console.log(route);
         });
       }
     }
   }
 });

</script>


<style lang="scss">
 @import '../../styles/main.scss';

 .gym-route-distribution {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   margin-bottom: 2rem;
   border-bottom: $default-border;

   .grades-container {
     display: flex;
     flex-basis: 100%;
     margin-top: auto;
     justify-content: space-around;
     margin-right: 2rem;
     margin-left: 2rem;

     .grade {
       flex-basis: 8%;
       margin-top: auto;
       display: flex;
       flex-wrap: wrap;
       justify-content: center;
       margin-left: 5px;
       margin-right: 5px;

         .circuit {
           display: flex;
           flex-basis: 100%;
           flex-wrap: wrap;

           &:hover {
             background-color: rgba(0, 0, 0, .3) !important;
           }

           .route {
             display: flex;
             flex-basis: 100%;
             height: 10px;
         }
       }
     }
   }
 }

</style>
