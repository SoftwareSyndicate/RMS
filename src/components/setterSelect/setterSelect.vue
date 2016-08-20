<template>
  <div class="setter-select">
    <select v-model="selected">
      <option value="" class="default">Setter</option>
      <option v-bind:value="setter.id" v-for="setter in setters">{{setter.first_name + " " + setter.last_name}}</option>
    </select>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import RouteModel from 'models/RouteModel'

 export default BaseComponent.extend({
   name: 'SetterSelect',
   props: {
     route: {
       type: Object,
       default: ()=>{},
       twoWay: true
     },
     setters: {
       type: Array,
       default: ()=>[]
     }
   },
   components: {

   },
   data(){
     return {
       selected: this.route.set_by || ""
     }
   },
   created(){
     this.$watch('selected', () => {
       this.route.set_by = this.selected;
       RouteModel.updateRoute(this.route);
     });
   }
 });

</script>


<style lang="scss">
 @import '../../styles/vars.scss';

 .setter-select {
   display: flex;
   flex-grow: 1;
 }


</style>
