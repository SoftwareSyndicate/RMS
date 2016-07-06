<template>
  <div class="walls-page">
    wall page
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'
 import WallModel from 'models/WallModel'

 export default BaseComponent.extend({
   name: 'WallsPage',
   components: {

   },
   data(){
     return {
       wall: null
     }
   },
   created(){
     this.getResources();
   },

   notifs(){
     return {
       "WallModel.currentWallUpdated": 'onWallUpdated'
     }
   },
   methods: {
     onWallUpdated(){
       this.wall = WallModel.currentWall;
       this.notifications.notify("Navbar.setHeader", this.wall.name);
     },

     getResources(){
       WallModel.watchWall(this.$route.params.id);
     }
   }
 });

</script>


<style lang="sass">
 @import '../../styles/main.scss';

 .walls-page {

 }

</style>
