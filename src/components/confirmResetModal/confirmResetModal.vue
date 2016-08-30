<template>
  <div class="confirm-reset-modal" v-show="show" transition="modal">
    <div class="modal-wrapper" @click="show = false">
      <div class="modal-container" @click.stop="">
        <h2>Are you sure you want to reset this wall?</h2>
        <div class="btn btn-primary delete" @click="close(false)">No<i class="material-icons"></i></div>
        <div class="btn btn-primary add" @click="close(true)">Yes<i class="material-icons"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'

 export default BaseComponent.extend({
   name: 'ConfirmResetModal',
   props: {
     show: {
       type: Boolean,
       twoWay: true
     },
     cb: {

     }
   },
   components: {

   },
   data(){
     return {
       name: ""
     }
   },
   created(){

   },

   methods: {
     close(reset){
       this.cb(reset);
       this.show = false;
     }
   }
 });

</script>


<style lang="scss">

 .confirm-reset-modal {
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

   .btn {
     margin: 20px;

     i {
       display: none;
     }
   }

   .modal-container {
     justify-content: center;
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

     input {
       margin-bottom: 1rem !important;
     }
   }


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
