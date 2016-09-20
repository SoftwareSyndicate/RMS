<template>
  <div class="rice-select-modal" v-show="show"> <!-- transition="modal"> -->
    <div class="modal-wrapper" @click="show = false">
      <div class="modal-container" @click.stop="">
        <h2>R.I.C.E Select</h2>
        <div class="rice-container">
          <div class="left">
            <div class="rice">Risk<span>{{route.risk}}</span></div>
            <div class="rice">Intensity<span>{{route.intensity}}</span></div>
            <div class="rice">Complexity<span>{{route.complexity}}</span></div>
            <div class="rice">Exposure<span>{{route.exposure}}</span></div>
          </div>
          <div class="right">
            <input max="5" min="0" step="1" type="range" v-model="route.risk">
            <input max="5" min="0" step="1" type="range" v-model="route.intensity">
            <input max="5" min="0" step="1" type="range" v-model="route.complexity">
            <input max="5" min="0" step="1" type="range" v-model="route.exposure">
          </div>
        </div>
        <div class="btn btn-primary" @click="show = false">Done</div>
      </div>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'

 export default BaseComponent.extend({
   name: 'RiceSelectModal',
   props: {
     route: {
       type: Object,
       default: () => {},
       twoWay: true
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
     save(){
       this.show = false;
     }
   }
 });

</script>


<style lang="scss">
 @import '../../styles/vars.scss';

 .rice-select-modal {
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
     justify-content: center;
     display: flex;
     flex-wrap: wrap;
     flex-grow: 1;
     width: 70%;
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

     .btn {
       margin-left: auto;
     }

     .rice-container {
       display: flex;
       align-items: center;
       justify-content: space-around;
       flex-grow: 1;
       margin-bottom: 2rem;

       .left {
         font-size: 1.2rem;
         display: flex;
         flex-wrap: wrap;

         .rice {
           align-items: center;
           padding: .5rem;
           display: flex;
           flex-basis: 100%;
           height: 40px;

           span {
             margin-left: auto;
           }
         }
       }
       .right {
         display: flex;
         flex-basis: 100%;
         flex-wrap: wrap;

         input {
           margin: .5rem !important;
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

   &.modal-enter, &.modal-leave {
     opacity: 0;
   }

   &.modal-enter &.modal-container,
   &.modal-leave &.modal-container {
     -webkit-transform: scale(1.1);
     transform: scale(1.1);
   }

   input[type=range] {
     padding: 0px !important;
     height: 40px !important;
     -webkit-appearance: none;
     width: 100%;
     margin: 13.8px 0;
     box-shadow: none;
     border: none !important;
     &:focus {
       border-bottom: none;
       box-shadow: none;
       background: white;
     }

   }
   input[type=range]:focus {
     outline: none;
   }
   input[type=range]::-webkit-slider-runnable-track {
     width: 100%;
     height: 8.4px;
     cursor: pointer;
     box-shadow: 1px 1px 1px rgba(0, 0, 0, .2), 0px 0px 1px rgba(0, 0, 0, .2);
     background-color: #FA7535;
     border-radius: 1.3px;
     border: 1px solid rgba(0, 0, 0, .2);
   }
   input[type=range]::-webkit-slider-thumb {
     box-shadow: 1px 1px 1px rgba(0, 0, 0, .2), 0px 0px 1px rgba(0, 0, 0, .2);
     border: 1px solid rgba(0, 0, 0, .2);
     height: 36px;
     width: 36px;
     border-radius: 50%;
     background: #ffffff;
     cursor: pointer;
     -webkit-appearance: none;
     margin-top: -14px;
   }
   input[type=range]:focus::-webkit-slider-runnable-track {
     background: $color-3;
   }
   input[type=range]::-moz-range-track {
     width: 100%;
     height: 8.4px;
     cursor: pointer;
     box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
     background: white;
     border-radius: 1.3px;
     border: 0.2px solid #010101;
   }
   input[type=range]::-moz-range-thumb {
     box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
     border: 1px solid #000000;
     height: 36px;
     width: 16px;
     border-radius: 3px;
     background: #ffffff;
     cursor: pointer;
   }
   input[type=range]::-ms-track {
     width: 100%;
     height: 8.4px;
     cursor: pointer;
     background: transparent;
     border-color: transparent;
     color: transparent;
   }
   input[type=range]::-ms-fill-lower {
     background: #2a6495;
     border: 0.2px solid #010101;
     border-radius: 2.6px;
     box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
   }
   input[type=range]::-ms-fill-upper {
     background: #3071a9;
     border: 0.2px solid #010101;
     border-radius: 2.6px;
     box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
   }
   input[type=range]::-ms-thumb {
     box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
     border: 1px solid #000000;
     height: 36px;
     width: 16px;
     border-radius: 3px;
     background: #ffffff;
     cursor: pointer;
     height: 8.4px;
   }
   input[type=range]:focus::-ms-fill-lower {
     background: #3071a9;
   }
   input[type=range]:focus::-ms-fill-upper {
     background: #367ebd;
   }
 }

</style>
