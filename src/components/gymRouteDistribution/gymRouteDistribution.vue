<template>
  <div class="gym-route-distribution">
    <div class="grades-container">
      <div class="grade" v-for="(gradeIndex, grade) in gradeData">
        <div class="circuit" v-for="(circuitIndex, circuit) in grade.circuits | reverse" :style="{'background-color': circuit.color, 'height': (circuit.routes.length * 8) + 'px'}">
          <span>{{circuit.routes.length}}</span>
        </div>
        <div class="grade-index">v{{gradeIndex}}</div>
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
       gradeData: {},
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
       this.gradeData = {};
       for(var i = 0; i <= this.largestGrade;  i++){
         let grade = {
           circuits:  []
         };
         this.gradeData[i] = grade;
         this.circuits.forEach(circuit => {
           if(circuit.start_range <= i && circuit.end_range >= i){
             let copy = Object.assign({}, circuit);
             copy.grade = i;
             copy.routes = [];
             this.gradeData[i].circuits.push(copy);
           }
         });
       }

       this.routes.forEach(route => {
         let gradeObj = this.gradeData[parseInt(route.grade)];
         gradeObj.circuits.forEach(circuit => {
           if(route.color === circuit.name){
             circuit.routes.push(route);
           }
         });
       });
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
   padding-top: 2rem;

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
       margin-left: .5rem;
       margin-right: .5rem;

       .circuit {
         display: flex;
         align-items: center;
         justify-content: center;
         flex-basis: 100%;
         flex-wrap: wrap;

         &:hover {
           background-color: rgba(0, 0, 0, .6) !important;
         }

         .route {
           display: flex;
           flex-basis: 100%;
           height: 10px;
         }

         span {
           display: none;
           color: azure;
         }

         &:hover span {
           display: flex;
         }
       }
     }
   }
 }

</style>
