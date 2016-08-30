<template>
  <div class="overlay-container" v-show="show" transition="modal">
    <div class='triangles'>
      <div class='tri invert'></div>
      <div class='tri invert'></div>
      <div class='tri'></div>
      <div class='tri invert'></div>
      <div class='tri invert'></div>
      <div class='tri'></div>
      <div class='tri invert'></div>
      <div class='tri'></div>
      <div class='tri invert'></div>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 export default BaseComponent.extend({
   name: 'Overlay',
   data(){
     return {
       show: false
     }
   },
   created(){

   },
   notifs(){
     return {
       "Overlay.setVisible": "setVisible"
     }
   },
   methods: {
     setVisible(event, visible){
       this.show = visible;

       if(this.show){
         document.body.style.overflow = "hidden";
       } else {
         document.body.style.overflow = "scroll";
       }
     }
   }
 })
</script>

<style lang="scss">
 .overlay-container {
   position: fixed;
   z-index: 9998;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, .5);
   display: table;
   transition: opacity .3s ease;

   @-webkit-keyframes pulse {
     0% {
       opacity: 1;
     }
     16.666% {
       opacity: 1;
     }
     100% {
       opacity: 0;
     }
   }
   @-moz-keyframes pulse {
     0% {
       opacity: 1;
     }
     16.666% {
       opacity: 1;
     }
     100% {
       opacity: 0;
     }
   }
   @keyframes pulse {
     0% {
       opacity: 1;
     }
     16.666% {
       opacity: 1;
     }
     100% {
       opacity: 0;
     }
   }

   .triangles {
     zoom: 1.4;
     -webkit-transform: translate(-50%, -50%);
     -moz-transform: translate(-50%, -50%);
     -ms-transform: translate(-50%, -50%);
     -o-transform: translate(-50%, -50%);
     transform: translate(-50%, -50%);
     height: 54px;
     width: 60px;
     position: absolute;
     left: 50%;
     top: calc(50% - 2px);
   }

   .tri {
     position: absolute;
     -webkit-animation: pulse 750ms ease-in infinite;
     -moz-animation: pulse 750ms ease-in infinite;
     animation: pulse 750ms ease-in infinite;
     border-top: 18px solid #CED3E4;
     border-left: 10px solid transparent;
     border-right: 10px solid transparent;
     border-bottom: 0px;
   }
   .tri.invert {
     border-top: 0px;
     border-bottom: 18px solid #CED3E4;
     border-left: 10px solid transparent;
     border-right: 10px solid transparent;
   }
   .tri:nth-child(1) {
     left: 20px;
   }
   .tri:nth-child(2) {
     left: 10px;
     top: 18px;
     -webkit-animation-delay: -125ms;
     -moz-animation-delay: -125ms;
     animation-delay: -125ms;
   }
   .tri:nth-child(3) {
     left: 20px;
     top: 18px;
   }
   .tri:nth-child(4) {
     left: 30px;
     top: 18px;
     -webkit-animation-delay: -625ms;
     -moz-animation-delay: -625ms;
     animation-delay: -625ms;
   }
   .tri:nth-child(5) {
     top: 36px;
     -webkit-animation-delay: -250ms;
     -moz-animation-delay: -250ms;
     animation-delay: -250ms;
   }
   .tri:nth-child(6) {
     top: 36px;
     left: 10px;
     -webkit-animation-delay: -250ms;
     -moz-animation-delay: -250ms;
     animation-delay: -250ms;
   }
   .tri:nth-child(7) {
     top: 36px;
     left: 20px;
     -webkit-animation-delay: -375ms;
     -moz-animation-delay: -375ms;
     animation-delay: -375ms;
   }
   .tri:nth-child(8) {
     top: 36px;
     left: 30px;
     -webkit-animation-delay: -500ms;
     -moz-animation-delay: -500ms;
     animation-delay: -500ms;
   }
   .tri:nth-child(9) {
     top: 36px;
     left: 40px;
     -webkit-animation-delay: -500ms;
     -moz-animation-delay: -500ms;
     animation-delay: -500ms;
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
