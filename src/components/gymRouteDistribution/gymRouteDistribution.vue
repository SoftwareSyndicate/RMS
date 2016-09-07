<template>
  <div class="gym-route-distribution">
    <div class="grades-container">
      <div class="grade" v-for="n in largestGrade" :class="{}">
        <div class="circuit" v-for="(circuitIndex, circuit) in circuits | reverse " :style="{'background-color': circuit.color}">
          <!-- <div class="route" v-for="(routeIndex, route) in routes" v-if="route.grade == n && route.color == circuit.name"></div> -->
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
     },
     largestGrade: {
       type: Number,
       default: 0
     }
   },
   data(){
     return {
       grades: [],
       route_data: {}
     }
   },
   created(){
     this.$watch('circuits', () => {
       if(this.routes.length > 0){
         this.formatData();
       }
     });
     this.$watch('routes', () => {
       if(this.circuits.length > 0){
         this.formatData();
       }
     });
   },
   ready(){

   },

   notifs(){
     return {

     }
   },
   methods: {
     formatData(){
       this.routeData = {};
       this.routeData.circuits = {};
       this.routeData.grades = []
       for(var i = 0; i < this.largestGrade;  i++){
         let grade = {};

         console.log(i);
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
