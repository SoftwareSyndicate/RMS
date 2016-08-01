<template>
  <div>
    <navbar></navbar>
    <div id="wrapper">
      <router-view class="view" transition transition-mode="out-in"></router-view>
    </div>
  </div>
</template>

<script>
 import UserModel from 'models/UserModel'
 import GymModel from 'models/GymModel'
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
       loaded: true,
       resourcesLoaded: false
     }
   },
   notifs(){
     return {

     }
   },
   created(){
     if(UserModel.currentUser){
       this.getResources();
     }
   },
   notifs(){
     return {
       'UserModel.userUpdated': 'getResources'
     }
   },
   methods: {
     getResources(){
       if(!this.resourcesLoaded){
         WallModel.watchAllWalls();
         RouteModel.watchAllRoutes();
         GymModel.watchAllGyms();
         this.resourcesLoaded = true;
       }
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
