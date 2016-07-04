<template>
  <div class="walls-page">
    <div class="btn btn-primary add-gym-button" @click.stop="createWall()">Create New Wall<i class="material-icons">dns</i></div>
    <wall-list :walls="walls"></wall-list>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'
 import WallModel from 'models/WallModel'

 import WallList from '../../SBP/src/components/wallList/wallList.vue'

 export default BaseComponent.extend({
   name: 'WallsPage',
   components: {
     WallList: WallList
   },
   data(){
     return {
       walls: []
     }
   },
   created(){
     this.getResources();
   },
   ready(){
     this.notifications.notify("Navbar.setHeader", "Walls");
   },

   notifs(){
     return {
       "WallModel.wallsUpdated": "onWallsUpdated"
     }
   },
   methods: {
     createWall(){

     },

     onWallsUpdated(){
       this.walls = WallModel.walls;
     },

     getResources(){
       //TODO remove this, all users should have a current Gym on Reg
       if(UserModel.currentUser.currentGymId){
         WallModel.getWallsByGymId(UserModel.currentUser.currentGymId);
       } else {
         WallModel.getWallsByGymId("-KLi8WWAMzuH1k4mlkbj");
       }

     }
   }
 });

</script>


<style lang="sass">
 @import '../../styles/main.scss';

 .walls-page {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   margin-top: 4em;

   .btn {
     margin-left: auto;
     margin-bottom: 1em;
   }

 }

</style>
