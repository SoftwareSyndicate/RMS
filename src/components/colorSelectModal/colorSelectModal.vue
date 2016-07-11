<template>
  <div class="color-select-modal" v-show="show">
    <div class="modal-wrapper" @click="show = false">
      <div class="modal-container" @click.stop="">
        <h2>Circuit Select</h2>
        <div class="diamond-container">
          <div class="circuit" v-for="circuit in circuits">
            <div class="diamond" v-for="grade in ((circuit.end_range + 1) - circuit.start_range)" @click="selectGrade(circuit, (circuit.end_range - grade))">
              <div class="diamond-background" v-bind:style="{'background-color': circuit.color}"></div>
              <div class="diamond-grade" v-bind:class="{'tenner': (circuit.end_range - grade) > 9}">
                {{circuit.end_range - grade}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'

 export default BaseComponent.extend({
   name: 'ColorSelectModal',
   props: {
     route: {
       type: Object,
       default: () => {},
       twoWay: true
     },
     circuits: {
       type: Array,
       default: () => []
     },
     show: {
       type: Boolean,
       twoWay: true
     }
   },
   components: {

   },
   data(){
     return {

     }
   },
   created(){

   },

   methods: {
     selectGrade(circuit, grade){
       this.route.color = circuit.name;
       this.route.grade = grade;
       this.route.htmlColor = circuit.color;
       this.show = false;
       console.log(this.route);
     }
   }
 });

</script>


<style lang="sass">
 @import '../../styles/vars.scss';
 @import '../../styles/grades.scss';

 .color-select-modal {
     position: fixed;
     z-index: 9998;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0, 0, 0, .5);
     display: table;
     transition: opacity .3s ease;

   .modal-wrapper {
     display: table-cell;
     vertical-align: middle;
   }

   .modal-container {
     display: flex;
     flex-wrap: wrap;
     flex-grow: 1;
     width: 50%;
     margin: 0px auto;
     padding: 2em 3em;
     background-color: #fff;
     border-radius: 2px;
     box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
     transition: all .3s ease;
     font-family: Helvetica, Arial, sans-serif;

     h2 {
       font-weight: 300;
       flex-basis: 100%;
       flex-grow: 1;
       margin-bottom: 1em;
     }

     .diamond-container {
       display: flex;

       .circuit {
         padding: .5em;
         display: flex;
         flex-wrap: wrap;

         .diamond {

         }
       }
     }
   }

   /*
    * the following styles are auto-applied to elements with
    * v-transition="modal" when their visiblity is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */

   .modal-enter, .modal-leave {
     opacity: 0;
   }

   .modal-enter .modal-container,
   .modal-leave .modal-container {
     -webkit-transform: scale(1.1);
     transform: scale(1.1);
   }
 }

</style>
