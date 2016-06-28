<template>
  <div class="walls-page">
    wall page
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'

 export default BaseComponent.extend({
   name: 'WallsPage',
   components: {

   },
   data(){
     return {
       walls: []
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

 .walls-page {

 }

</style>
