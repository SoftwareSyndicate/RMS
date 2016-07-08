<template>
  <div class="route-list-item">
    route list item
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'

 export default BaseComponent.extend({
   name: 'RouteListItem',
   props: {
     route: {
       type: Object,
       default: () => {}
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

 .route-list-item {

 }

</style>
