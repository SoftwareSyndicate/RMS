<template>
  <div class="gym-page">
    <div class="btn btn-primary add-gym-button" @click.stop="createGym()">Make Current Gym<i class="material-icons">business</i></div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import GymModel from 'models/GymModel'

 export default BaseComponent.extend({
   name: 'GymPage',
   components: {

   },
   data(){
     return {

     }
   },
   created(){
     this.getResources();
   },

   ready(){

   },

   notifs(){
     return {
       "GymModel.currentGymUpdated": 'onGymUpdated'
     }
   },

   beforeDestroy(){

   },

   methods: {
     onGymUpdated(){
       this.gym = GymModel.currentGym;
       this.notifications.notify("Navbar.setHeader", this.gym.name);
     },

     getResources(){
       console.log(this.$route);
       GymModel.watchGym(this.$route.params.id);
     }
   }
 });

</script>


<style lang="scss">
 @import '../../styles/main.scss';

 .gym-page {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   margin-top: $page-margin-top;

   .btn {
     margin-left: auto;
     margin-bottom: 2em;
   }

 }

</style>
