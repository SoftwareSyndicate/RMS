<template>
  <div>
    <navbar></navbar>
    <overlay></overlay>
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
 import NotificationModel from 'models/NotificationModel'

 import Navbar from 'components/navbar/navbar'
 import Overlay from 'components/overlay/overlay'

export default {
   name: 'App',
   components: {
     Navbar,
     Overlay
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
         GymModel.watchGym(window.gymId);
         UserModel.watchAllSetters();
         NotificationModel.watchAllNotifications(window.gymId);
         this.resourcesLoaded = true;
       }
     }
   }
 };

</script>


<style lang="scss">
 @import "../styles/main";

 body {
   margin: 0;
   background-color: $color-background;
   font-family: 'Yantramanav', sans-serif;
   font-weight: 300;
   color: $color-text-secondary;
   height: 100vh;

   #wrapper {
     display: flex;
     padding-top: $navbar-height;
     /* width: $max-width; */
     margin: auto;
   }
 }

</style>
