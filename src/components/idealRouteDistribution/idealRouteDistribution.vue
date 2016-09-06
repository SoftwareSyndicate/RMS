<template>
  <div class="ideal-route-distribution">
    <div class="top">
      <div class="grade-headers">
        <div class="empty">&nbsp</div>
        <div class="grade" v-for="grade in largestGrade"><span>v{{grade}}</span></div>
        <div class="empty">&nbsp</div>
      </div>
    </div>
    <div class="main">
      <div class="circuits">
        <div class="circuit" v-for="circuit in circuits">
          <div class="color" :style="{'background-color': circuit.color}">
            <div class="color-name">{{circuit.name}}</div>
          </div>
          <div class="grades">
            <div class="grade" v-for="grade in largestGrade">
              <input type="number" name="quantity" min="0" max="50">
            </div>
          </div>
          <div class="total">
            total
          </div>
        </div>
      </div>
      <div class="totals">
        <div class="title">
          Total Routes
        </div>
        <div class="grades">
          <div class="grade" v-for="grade in largestGrade">
            <input type="number" name="quantity" min="0" max="50">
          </div>
        </div>
        <div class="empty">
          &nbsp
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'

 export default BaseComponent.extend({
   name: 'IdealRouteDistibution',
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

     }
   }
 });

</script>


<style lang="scss">
 @import '../../styles/main.scss';

 .ideal-route-distribution {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;

   .top {
     display: flex;
     flex-wrap: wrap;
     flex-basis: 100%;
     height: 60px;
     background-color: #f8f9ff;

     .grade-headers {
       display: flex;
       flex-wrap: wrap;
       flex-basis: 100%;
       align-items: center;
     }

     .empty {
       flex-basis: 10%;
       padding: 1rem;
     }

     .grade {
       display: flex;
       flex-grow: 1;
       align-items: center;
       justify-content: center;
       height: 40px;
       width: 40px;

       span {
         padding: 5px;
         /* background-color: darken(#f8f9ff, 8%); */
         border-radius: 50%;
       }
     }
   }

   .main {
     display: flex;
     flex-basis: 100%;
     flex-wrap: wrap;

     .circuits {
       display: flex;
       flex-wrap: wrap;
       flex-basis: 100%;

       .circuit {
         display: flex;
         flex-basis: 100%;

         .color {
           padding: 1rem;
           flex-basis: 10%;

           .color-name {
             color: azure;
             background-color: rgba(0, 0, 0, .1);
             padding: 2px 0px 2px 15px;
             font-size: 14px;
           }
         }

         .grades {
           display: flex;
           flex-grow: 1;

           .grade {
             display: flex;
             flex-grow: 1;
             align-items: center;
             justify-content: center;
             border: $default-thin-border;

             input {
               box-shadow: none;
               border: none;
               border: none !important;
             }
           }
         }

         .total {
           border: $default-thin-border;
           display: flex;
           flex-basis: 10%;
           align-items: center;
           justify-content: center;
         }
       }
     }

     .totals {
       display: flex;
       flex-basis: 100%;

       .title {
         padding: 1rem;
         flex-basis: 10%;
       }

       .grades {
         display: flex;
         flex-grow: 1;

         .grade {
           display: flex;
           flex-grow: 1;
           align-items: center;
           justify-content: center;
           border: $default-thin-border;

           input {
             box-shadow: none;
             border: none !important;
           }
         }
       }
       .empty {
         display: flex;
         flex-basis: 10%;
         border: $default-thin-border;
       }
     }
   }
 }

</style>
