<template>
  <div class="gyms-page">
    <div class="btn btn-primary add-gym-button" @click.stop="createGym()">Add Gym<i class="material-icons">add_box</i></div>
    <div class="gym-list-container">
      <gym-list :gyms=gyms></gym-list>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'
 import GymModel from 'models/GymModel'
 import GymList from 'components/gymList/gymList'

 export default BaseComponent.extend({
   name: 'GymsPage',
   components: {
     GymList: GymList
   },
   data(){
     return {
       gyms: GymModel.gyms
     }
   },
   created(){

   },
   ready(){
     this.notifications.notify("Navbar.setHeader", "Gyms");
   },

   notifs(){
     return {
       "GymModel.gymsUpdated": 'onGymsUpdated'
     }
   },
   methods: {
     onGymsUpdated(e){
       this.gyms = GymModel.gyms;
     },

     createGym(){
       GymModel.createGym(this.name).then(results => {
         this.gyms = GymModel.gyms;
       });
     }
   }
 });

</script>


<style lang="scss">
 @import '../../styles/main.scss';

 .gyms-page {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   margin-top: $page-margin-top;

   .btn {
     margin-left: auto;
     margin-bottom: 2em;
     min-width: 8em;
   }

   .gym-list-container {
     display: flex;
     flex-wrap: wrap;
     flex-grow: 1;
     flex-basis: 100%;
   }
 }

</style>
