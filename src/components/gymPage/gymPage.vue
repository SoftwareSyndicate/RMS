<template>
  <div class="gym-page">

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


<style lang="sass">
 @import '../../styles/main.scss';

 .gym-page {

 }

</style>
