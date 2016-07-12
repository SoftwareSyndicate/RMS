<template>
  <div class="route-list">
    <route-list-item :route.sync="route" v-for="route in routes" :delete-route="deleteRoute"></route-list-item>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import RouteListItem from 'components/routeListItem/routeListItem'

 export default BaseComponent.extend({
   name: 'RouteList',
   props: {
     routes: {
       type: Array,
       default: () => [],
       twoWay: true
     },
     deleteRoute: {}
   },
   components: {
     RouteListItem: RouteListItem
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
