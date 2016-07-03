<template>
  <div class="gym-list-item">
    gym name
    {{gym.name}}
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'

 export default BaseComponent.extend({
   name: 'GymListItem',
   props: {
     gym: {
       type: Object,
       default: {}
     }
   },
   data(){
     return {

     }
   },
   created(){
     console.log("gym list item");
     console.log(this.gym);
   },
   ready(){

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

 .gym-list-item {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   margin-top: 4em;
 }

</style>
