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

 import SetterList from 'components/setterList/setterList'

 export default BaseComponent.extend({
   name: 'SettersPage',
   components: {
     SetterList
   },
   data(){
     return {
       setters: []
     }
   },
   created(){

   },

   ready(){
     this.notifications.notify("Navbar.setHeader", "Setters");
     this.setters = UserModel.setters;
   },
   notifs(){
     return {
       "UserModel.settersUpdated": "onSettersUpdated"
     }
   },
   methods: {
     onSettersUpdated() {
       this.setters = UserModel.setters;
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
