<template>
  <div class="route-list-item component">

    <div class="grade-container">
      <div class="diamond">
        <div class="diamond-background" v-bind:style="{'background-color': route.color}"></div>
        <div class="diamond-grade" v-bind:class="{'tenner': route.grade > 9}">
          {{route.grade}}
        </div>
      </div>
    </div>

    <div class="status-container">
      <div class="status" v-bind:class="{'two': route.status == 0}"></div>
    </div>

    <div class="setter-container">
      {{route.setter}}
    </div>

    <div class="rice-container">
      {{route.rice}}
    </div>

    <div class="notes-container">
      <input type="text" placeholder="Notes" v-model="route.notes"/>
    </div>


    <div class="remove-container">
      <div class="btn btn-primary delete-route-button delete" @click.stop="deleteRoute()">Delete<i class="material-icons">indeterminate_check_box</i></div>
      <div class="route-list-container">
    </div>

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
     console.log(this.route);
   },

   methods: {
     deleteRoute(){

     }
   }
 });

</script>


<style lang="sass">
 @import '../../styles/vars.scss';

 .route-list-item {
   display: flex;
   align-items: center;

   padding: .5em 2em .5em 2em;
   margin-bottom: 10px;

   .grade-container {
     display: flex;
     flex-basis: 20%;
     flex-grow: 1;

     .diamond {
       position: relative;
       .diamond-background {
         position: absolute;
         width: 2em;
         height: 2em;
         transform: rotate(45deg);
         transform-origin: 0 100%;
         background-color: red;
         top: -2em;
       }

       .diamond-grade {
         font-weight: normal;
         font-size: .9em;
         color: white;
         position: absolute;
         top: -.72em;
         right: -1.88em;

       }

       .tenner {
         right: -2.12em;
       }
     }
   }

   .status-container {
     display: flex;
     flex-basis: 20%;
     flex-grow: 1;

     .status {
       height: 20px;
       width: 20px;

       &.zero {
         height: 40px;
         border-left: solid 10px rgba(0, 0, 0, .8);
       }

       &.one {
         height: 30px;
         width: 30px;
         border-left: solid 10px rgba(0, 0, 0, .8);
         border-bottom: solid 10px rgba(0, 0, 0, .8);
       }

       &.two {
         height: 30px;
         border-left: solid 10px rgba(0, 0, 0, .8);
         border-bottom: solid 10px rgba(0, 0, 0, .8);
         border-right: solid 10px rgba(0, 0, 0, .8);
       }

       &.three {
         border-left: solid 10px rgba(0, 0, 0, .8);
         border-bottom: solid 10px rgba(0, 0, 0, .8);
         border-right: solid 10px rgba(0, 0, 0, .8);
         border-top: solid 10px rgba(0, 0, 0, .8);
       }

     }
   }

   .setter-container {
     display: flex;

     flex-basis: 20%;
     flex-grow: 1;

   }

   .rice-container {
     display: flex;
     flex-basis: 20%;
     flex-grow: 1;

   }

   .notes-container {
     padding-right: .5em;
     padding-left: .5em;
     display: flex;
     flex-basis: 20%;
     flex-grow: 1;

   }


   .remove-container {
     display: flex;
     flex-basis: 30%;
     flex-grow: 1;

     .btn {
       margin-bottom: 0px;
     }
   }
 }

</style>
