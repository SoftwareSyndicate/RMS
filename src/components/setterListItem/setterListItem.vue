<template>
  <div class="setter-list-item">
    <div class="header">
      <div class="avatar">
        <img src="https://api.adorable.io/avatars/50/1@adorable.io.png">
      </div>
      <div class="name">
        <span>{{setter.first_name + ' ' + setter.last_name}}</span>
      </div>
      <div class="active-switch">
        <!-- checkbox here -->
        <input type="checkbox" id="sent-switch-checkbox-{{route.id}}" v-model="setter.active"/>
      </div>
    </div>
    <div class="body">
      <div class="setter-stat">
        <span>Routes Set: </span><span>{{setter.routes.length}}</span>
      </div>
      <div class="setter-stat">
        <span>Avg Grade: </span><span>{{setter.avgGrade}}</span>
      </div>
      <div class="setter-stat">
        <span>Favorite Color: </span><span>{{setter.favoriteColor}}</span>
      </div>
      <div class="setter-stat">
        <span>Routes Set: </span><span>{{setter.routes.length}}</span>
      </div>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'

 export default BaseComponent.extend({
   name: 'SetterListItem',
   props: {
     setter: {
       type: Object,
       default: () => {},
       twoWay: true
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
     calcAvgGrade(){
       let gradeTotal = 0;
       this.setter.routes.forEach(route => {
         gradeTotal += parseInt(route.grade);
       });

       this.setter.avgGrade = gradeTotal / this.setter.routes.length;
     },

     favoriteColor(){

     }
   }
 });

</script>


<style lang="scss">

 .setter-list-item {
   display: flex;

   background-color: white;

   .header {
     padding: .5rem;
     display: flex;
     flex-basis: 100%;
     align-items: center;
     border-bottom: 1px solid rgba(0, 0, 0, .1);

     .avatar {
       img {
         height: 50px;
         width: 50px;
       }
     }

     .name {
       span {
         font-size: 1em;
         font-weight: 300;
       }
     }

     .active-switch {
       margin-left: auto;
     }
   }

   .body {
     display: flex;
     flex-basis: 100%;
     padding: .5rem;

     .setter-stat {
       display: flex;
       flex-basis: 100%;
       align-items: center;
     }
   }
 }

</style>
