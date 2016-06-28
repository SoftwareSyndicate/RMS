<template>
  <div class="gyms-page">
    gyms page
    <!-- <gym-list gyms=gyms></gym-list> -->
    <div class="btn btn-primary add-gym-button">Create New Gym<i class="material-icons">add_to_queue</i></div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'

 export default BaseComponent.extend({
   name: 'GymsPage',
   components: {

   },
   data(){
     return {
       gyms: []
     }
   },
   created(){

   },

   notifs(){
     return {

     }
   },
   methods: {

   }
 });

</script>


<style lang="sass">
 @import '../../styles/main.scss';

 .gyms-page {


 }

</style>
