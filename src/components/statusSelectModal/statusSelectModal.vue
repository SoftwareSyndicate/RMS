<template>
  <div class="status-select-modal" v-show="show"> <!-- transition="modal"> -->
    <div class="modal-wrapper" @click="show = false">
      <div class="modal-container" @click.stop="">
        <h2>Status Select</h2>
        <div class="status-container">
          <div class="status zero" @click="selectStatus(0)"></div>
          <div class="status one" @click="selectStatus(1)"></div>
          <div class="status two" @click="selectStatus(2)"></div>
          <div class="status three" @click="selectStatus(3)"></div>
          <div class="status four" @click="selectStatus(4)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'

 export default BaseComponent.extend({
   name: 'StatusSelectModal',
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
     selectStatus(status){
       this.route.status = status;
       this.show = false;
       this.notifications.notify("StatusSelectModal.routeUpdated", this.route);
     }
   }
 });

</script>


<style lang="scss">
 @import '../../styles/vars.scss';

 .status-select-modal {
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

     .status-container {
       display: flex;
       align-items: center;
       justify-content: space-around;
       flex-grow: 1;
     }

     .status {
       &.zero {
         height: 60px;
         width:  60px;
         border: solid 1px rgba(0, 0, 0, .1);
         box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
       }

       &.one {
         height: 60px;
         border-left: solid 10px rgba(0, 0, 0, .8);
       }

       &.two {
         height: 50px;
         width: 50px;
         border-left: solid 10px rgba(0, 0, 0, .8);
         border-bottom: solid 10px rgba(0, 0, 0, .8);
       }

       &.three {
         height: 50px;
         width: 40px;
         border-left: solid 10px rgba(0, 0, 0, .8);
         border-bottom: solid 10px rgba(0, 0, 0, .8);
         border-right: solid 10px rgba(0, 0, 0, .8);
       }

       &.four {
         height: 40px;
         width: 40px;
         border: solid 10px rgba(0, 0, 0, .8);
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
 }

</style>
