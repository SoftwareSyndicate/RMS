<template>
  <div class="setter-list">
    <div class="container" v-for="setter in setters">
      <setter-list-item :setter.sync="setter"></setter-list-item>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import SetterListItem from 'components/setterListItem/setterListItem'

 export default BaseComponent.extend({
   name: 'SetterList',
   props: {
     setters: {
       type: Array,
       default: () => [],
       twoWay: true
     }
   },
   components: {
     SetterListItem: SetterListItem
   },
   data(){
     return {

     }
   },
   created(){

   },

   methods: {

   }
 });

</script>

<style lang="scss">
 @import '../../styles/vars.scss';

 .setter-list {
   display: flex;
   flex-wrap: wrap;
   flex-basis: 100%;

   .container {
     display: flex;
     flex-wrap: wrap;
     flex-grow: 1;

     @media (min-width: $medium-screen){
       flex-basis: 33%;
     }

     .setter-list-item {
       margin: 1rem;
       display: flex;
       flex-basis: 100%;
     }
   }

 }

</style>
