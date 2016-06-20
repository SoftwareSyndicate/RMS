<template>
  <navbar></navbar>
  <div id="wrapper">
    <router-view class="view" transition transition-mode="out-in"></router-view>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'

 import Navbar from 'components/navbar/navbar'

 var App = BaseComponent.extend({
   name: 'App',
   components: {
     Navbar
   },
   data(){
     return {
     }
   },
   notifs(){
     return {

     }
   },
   created(){
   },
   methods: {
   }
 });

 export default App;
</script>


<style lang="sass">
 @import "../styles/main";


 body {
   margin: 0;
   background-color: $color-background;
   font-family: lato;
   font-weight: 300;
   color: $color-text-primary;

   #wrapper {
     display: flex;
     padding-top: $navbar-height;
     width: $max-width;
     margin: auto;
   }
 }

</style>
