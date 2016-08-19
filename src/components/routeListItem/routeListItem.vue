<template>
  <div class="route-list-item component">

    <div class="grade-container" @click.stop="colorSelected()">
      <div class="diamond" v-bind:style="{'background-color': route.htmlColor}">
        <div class="diamond-grade" v-bind:class="{'tenner': route.grade > 9}">
          {{route.grade}}
        </div>
      </div>
    </div>

    <div class="status-container" @click.stop="statusSelected()">
      <div class="status" v-bind:class="{'zero': route.status == 0,'one': route.status == 1, 'two': route.status == 2, 'three': route.status == 3 }"></div>
    </div>

    <div class="setter-container">
      <setter-select :route.sync="route" :setters="setters"></setter-select>
    </div>

    <div class="rice-container" @click.stop="riceSelected()">
      <div class="rice risk">
        R
        <span>{{route.risk}}</span>
      </div>
      <div class="rice intensity">
        I
        <span>{{route.intensity}}</span>
      </div>
      <div class="rice complexity">
        C
        <span>{{route.complexity}}</span>
      </div>
      <div class="rice exposure">
        E
        <span>{{route.exposure}}</span>
      </div>
    </div>

    <div class="notes-container">
      <input type="text" placeholder="Notes" v-model="route.notes"/>
    </div>

    <div class="remove-container">
      <div class="btn btn-primary delete-route-button delete" @click.stop="deleteRoute(route.id)">Delete<i class="material-icons">indeterminate_check_box</i></div>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import SetterSelect from 'components/setterSelect/setterSelect'

 export default BaseComponent.extend({
   name: 'RouteListItem',
   props: {
     route: {
       type: Object,
       default: () => {},
       twoWay: true
     },
     deleteRoute: {}
   },
   components: {
     SetterSelect: SetterSelect
   },
   data(){
     return {

     }
   },
   created(){

   },

   methods: {
     colorSelected(){
       this.notifications.notify("RouteListItem.colorSelected", this.route);
     },
     statusSelected(){
       this.notifications.notify("RouteListItem.statusSelected", this.route);
     },
     riceSelected(){
       this.notifications.notify("RouteListItem.riceSelected", this.route);
     }

   }
 });

</script>


<style lang="scss">
 @import '../../styles/vars.scss';

 .route-list-item {
   display: flex;
   align-items: center;

   padding: .5em 2em .5em 2em;
   margin-bottom: 10px;

   .grade-container {
     display: flex;
     flex-basis: 15%;
     flex-grow: 1;
   }

   .status-container {
     display: flex;
     flex-basis: 15%;
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
     justify-content: space-around;
     cursor: pointer;

     .rice {
       display: flex;
       flex-wrap: wrap;
       justify-content: center;

       span {
         text-align: center;
         flex-basis: 100%;
       }
     }

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
     flex-basis: 20%;
     flex-grow: 1;

     .btn {
       flex-grow: 1;
       margin-bottom: 0px;
     }
   }
 }

</style>
