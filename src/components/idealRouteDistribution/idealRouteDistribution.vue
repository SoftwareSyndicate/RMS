<template>
  <div class="ideal-route-distribution">
    <div class="top">
      <div class="empty">&nbsp</div>
      <div class="grade-headers">
        <div class="grade" v-for="grade in largestGrade">
          <div class="circle">
            <span>v{{grade}}</span>
          </div>
        </div>
      </div>
      <div class="empty-last">&nbsp</div>
    </div>
    <div class="main">
      <div class="circuits">
        <div class="circuit" v-for="circuit in circuits">
          <div class="color" :style="{'background-color': circuit.color}">
            <div class="color-name">{{circuit.name}}</div>
          </div>
          <div class="grades">
            <div class="grade" v-for="grade in largestGrade">
              <div class="input-container"  v-if="grade >= circuit.start_range && grade <= circuit.end_range">
                <input type="number" name="quantity" min="0" max="50" v-model="circuit['ideal_v' + grade]">
              </div>
              <div class="input-container empty" v-else>
                <input type="number" name="quantity" min="0" max="50" disabled>
              </div>
            </div>
          </div>
          <div class="total">
            {{circuitTotals[$index]}}
          </div>
        </div>
      </div>
      <div class="totals">
        <div class="title">
          Total Routes
        </div>
        <div class="grades">
          <div class="grade" v-for="grade in gradeTotals" track-by="$index">
            {{grade}}
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
     }
   },
   data(){
     return {
       largestGrade: 0,
       grades: [],
       gradeTotals: [],
       circuitTotals: []
     }
   },
   created(){
     this.$watch('circuits', () => {
       this.parseGrades(this.circuits);
       this.calcGradeTotals(this.circuits);
       this.calcCircuitTotals(this.circuits);
     }, {
       deep: true
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

     calcGradeTotals(circuits){
       this.gradeTotals = [];
       for(var i = 0; i < this.largestGrade; i++){
         let total = 0;
         circuits.forEach(circuit => {
           total += parseInt(circuit['ideal_v' + i]);
         });
         this.gradeTotals.push(total);
       }
     },

     calcCircuitTotals(circuits){
       this.circuitTotals = [];
       circuits.forEach(circuit => {
         let total = 0;
         for(var i = 0; i < this.largestGrade; i++){
           total += parseInt(circuit['ideal_v' + i]);
         }
         this.circuitTotals.push(total);
       });
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
     flex-basis: 100%;
     height: 60px;
     background-color: #f8f9ff;

     .grade-headers {
       display: flex;
       flex-grow: 1;
       align-items: center;
     }

     .empty {
       flex-basis: 10%;
       padding: 1rem;
     }

     .empty-last {
       flex-basis: 10%;
       padding: 0px;
     }


     .grade {
       display: flex;
       flex-grow: 1;
       align-items: center;
       justify-content: center;
       border: 1px rgba(0, 0, 0, 0);
       flex-basis: 100%;
       height: 100%;

       .circle {
         background-color: darken(#f8f9ff, 4%);
         border-radius: 50%;
         height: 30px;
         width: 30px;
         display: flex;
         align-items: center;
         justify-content: center;

         span {
           padding: 0px;
           font-size: 12px;
         }
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

             .input-container {
               height: 100%;
               display: flex;
               flex-basis: 100%;
               align-items: center;
               justify-content: center;

               &.empty {
                 background-color: #f8f9ff;

                 input {
                   background-color: #f8f9ff;
                 }
               }
             }

             input {
               font-size: 14px !important;
               box-shadow: none;
               border: none;
               border: none !important;
               padding: 0px !important;
               text-align: center;
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
           flex-basis: 100%;
           justify-content: center;
           border: $default-thin-border;
           font-size: 14px !important;
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
