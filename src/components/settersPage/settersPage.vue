<template>
  <div class="setters-page">
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
     this.routes = RouteModel.routes;
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
   },
   methods: {
     onSettersUpdated(){
       this.setters = UserModel.setters;
       if(this.routes.length > 0){
         this.parseRoutes();
       }
     },

     onRoutesUpdated(){
       this.routes = RouteModel.routes;
       if(this.setters.length > 0){
         this.parseRoutes();
       }
     },

     parseRoutes(){
       console.log(this.routes);
       this.routes.forEach(route => {
         this.setters.forEach(setter => {
           if(!setter.routes){
             setter.routes = [];
           }
           if(setter.id === route.set_by){
             setter.routes.push(route);
           }
         });
       });

       console.log(this.setters);
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
   margin-top: $page-margin-top;

 }

</style>
