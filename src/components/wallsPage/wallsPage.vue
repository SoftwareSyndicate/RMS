<template>
  <div class="walls-page">
    <!-- <wall-list :walls="walls"></wall-list> -->
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'

 /* import WallList from '../../SBP/src/components/wallList/wallList.vue' */

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
