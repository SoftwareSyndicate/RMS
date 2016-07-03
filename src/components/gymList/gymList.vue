<template>
  <div class="gym-list">
    <gym-list-item :gym="gym" v-for="gym in gyms"></gym-list-item>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import GymListItem from 'components/GymListItem/GymListItem'

 export default BaseComponent.extend({
   name: 'GymsPage',
   components: {
     GymListItem: GymListItem
   },
   props: {
     gyms: {
       type: Array,
       default: []
     }
   },
   data(){
     return {

     }
   },
   created(){

   },
   ready(){
     this.notifications.notify("Navbar.setHeader", "Gyms");
   },

   notifs(){
     return {

     }
   },
   methods: {
     createGym(){
       console.log("create gym");
       let now = new Date().getTime();
       let gym = {
         name: "Austin Bouldering Project",
         created_at: now,
         updated_at: now
       }
       GymModel.createGym(gym).then(results => {
         console.log("results:", results);

       });
     }
   }
 });

</script>


<style lang="sass">
 @import '../../styles/main.scss';

 .gym-list {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
 }

</style>
