<template>
  <div class="route-list">
    route list yo
    <route-list-item :route="route" v-for="route in routes"></route-list-item>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'

 export default BaseComponent.extend({
   name: 'RouteList',
   props: {
     routes: {
       type: Array,
       default: () => []
     }
   },
   components: {

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


<style lang="sass">
 @import '../../styles/vars.scss';

 .route-list {

 }

</style>
