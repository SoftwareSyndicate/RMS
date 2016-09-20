<template>
  <div class="setters-page">
    <div class="secondary-nav">
      <div class="container">
        <span>Route Setters</span>
      </div>
    </div>
    <div class="setter-list-container">
      <setter-list :setters.sync="setters"></setter-list>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'
 import RouteModel from 'models/RouteModel'

 import SetterList from 'components/setterList/setterList'

 export default BaseComponent.extend({
   name: 'SettersPage',
   components: {
     SetterList
   },
   data(){
     return {
       setters: [],
       routes: []
     }
   },
   created(){
     RouteModel.routesRef.off();
     RouteModel.routes = [];
     RouteModel.watchAllRoutes(true);
   },

   ready(){
     this.notifications.notify("Navbar.setHeader", "Setters");
     this.setters = UserModel.setters;
     this.setters.forEach(setter => {
       setter.routes = [];
     });
     this.routes = RouteModel.routes;
     $("#wrapper").css("width", "100%");
   },
   notifs(){
     return {
       "UserModel.settersUpdated": "onSettersUpdated",
       "RouteModel.routesUpdated": "onRoutesUpdated"
     }
   },

   beforeDestroy(){
     RouteModel.routesRef.off();
     RouteModel.routes = [];
     RouteModel.watchAllRoutes();
     $("#wrapper").css("width", "90%");
   },
   methods: {
     onSettersUpdated(){
       this.setters = UserModel.setters;
       if(this.routes.length > 0 && this.setters.length > 0){
         this.parseRoutes();
       }
     },

     onRoutesUpdated(){
       this.routes = RouteModel.routes;
       if(this.setters.length > 0 && this.routes.length > 0){
         this.parseRoutes();
       }
     },

     parseRoutes(){
       this.routes.forEach(route => {
         this.setters.forEach(setter => {
           if(setter.id === route.set_by){
             setter.routes.push(route);
           }
         });
       });

       this.calcAvgGrade();
       this.favoriteColor();
       this.lastSet();
     },

     calcAvgGrade(){
       this.setters.forEach(setter => {
         let gradeTotal = 0;
         setter.routes.forEach(route => {
           gradeTotal += parseInt(route.grade);
         });
         setter.avgGrade = (gradeTotal / setter.routes.length).toString().substr(0, 3);
       });
     },

     favoriteColor(){
       this.setters.forEach(setter => {
         setter.routes.forEach(route => {
           if(setter.favoriteColors[route.color]){
             setter.favoriteColors[route.color].total++;
           } else {
             setter.favoriteColors[route.color] = {
               color: route.color.charAt(0).toUpperCase() + route.color.slice(1),
               hex: route.htmlColor,
               total: 1
             }
           }
         });

         let favoriteColor = {
           total: 0
         };

         for(let color in setter.favoriteColors){
           if(setter.favoriteColors[color].total > favoriteColor.total){
             favoriteColor = setter.favoriteColors[color];
           }
         }

         setter.favoriteColor = favoriteColor;
       });
     },

     lastSet(){
       this.setters.forEach(setter => {
         setter.lastSet = setter.routes[0].created_at;
         setter.routes.forEach(route => {
           if(route.created_at > setter.lastSet){
             setter.lastSet = route.created_at;
           }
         });
         setter.lastSet = new Date(setter.lastSet);
       });
     }
   }
 });

</script>


<style lang="scss">
 @import '../../styles/main.scss';

 .setters-page {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;

   .secondary-nav {
     display: flex;
     flex-grow: 1;
     flex-basis: 100%;
     position: fixed;
     width: 100%;
     height: 60px;
     background-color: rgba(248, 249, 255, 1);
     align-items: center;
     transition: all 300ms;
     box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
     margin-bottom: $page-margin-top;


     .container {
       width: 90%;
       margin-right: auto;
       margin-left: auto;

       span {
         color: $color-text-normal;
         margin-left: 1rem;
         font-size: 1.1rem;
         font-weight: 400;
       }
     }
   }

   .setter-list-container {
     width: 90%;
     margin-top: 6rem;
     margin-right: auto;
     margin-left: auto;
     margin-bottom: 2rem;
   }

 }

</style>
