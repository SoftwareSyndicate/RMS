<template>
  <div>
    <navbar></navbar>
    <div id="wrapper">
      <router-view class="view" transition transition-mode="out-in"></router-view>
    </div>
  </div>
</template>

<script>
 import WallModel from 'models/WallModel'
 import RouteModel from 'models/RouteModel'

 import BaseComponent from 'base/baseComponent.vue'
 import Navbar from 'components/navbar/navbar'

 var App = BaseComponent.extend({
   name: 'App',
   components: {
     Navbar
   },
   data(){
     return {
     }
   },
   notifs(){
     return {

     }
   },
   created(){
     this.getResources();
   },
   methods: {
     getResources(){
       WallModel.watchAllWalls();
       RouteModel.watchAllRoutes();
     }
   }
 });

 export default App;
</script>


<style lang="sass">
 @import "../styles/main";

 body {
   margin: 0;
   background-color: $color-background;
   font-family: 'Yantramanav', sans-serif;
   font-weight: 300;
   color: $color-text-secondary;

   #wrapper {
     display: flex;
     padding-top: $navbar-height;
     width: $max-width;
     margin: auto;
   }
 }

</style>
