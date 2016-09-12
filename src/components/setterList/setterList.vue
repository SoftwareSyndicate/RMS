<template>
  <div class="setter-list">
    <setter-list-item :setter.sync="route" v-for="setter in setters"></setter-list-item>
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

 .setter-list {
   display: flex;
   flex-wrap: wrap;
   flex-basis: 100%;

   .setter-list-item {
     flex-basis: 100%;
   }

 }

</style>
