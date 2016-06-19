<template>
  <div class="sign-up-page">
    <div class="form-container">
      <form>
        <input type="email"/>
        <input type="password"/>
      </form>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'

 var SignUpPage = BaseComponent.extend({
   name: 'SignUpPage',
   components: {

   },
   data(){
     return {

     }
   },
   created(){

   },

   notifs(){
     return {

     }
   },
   methods: {
     signUpWithFacebook(){
       UserModel.signUpWithFacebook();
     }
   }
 });

 export default SignUpPage;
</script>


<style lang="sass">
 @import '../../styles/main.scss';

 .sign-up-page {
   .form-container {
     background-color: $color-sub-container;

   }
 }

</style>
