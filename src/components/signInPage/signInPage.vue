<template>
  <div class="sign-in-page">
    <div class="form-container">
      <h2>Sign In</h2>
      <form>
        <input type="email" placeholder="Email"/>
        <input type="password" placeholder="Password"/>
        <div class="btn btn-primary">Submit</div>
      </form>

      <div class="btn btn-facebook">Sign in with Facebook</div>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'

 export default BaseComponent.extend({
   name: 'SignInPage',
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
     signInWithFacebook(){
       UserModel.signUpWithFacebook();
     }
   }
 });


</script>


<style lang="sass">
 @import '../../styles/main.scss';

 .sign-in-page {
   display: flex;
   flex-basis: 100%;
   justify-content: center;

   .form-container {
     padding: 3em;
     margin-top: 20%;
     background-color: $color-sub-container;

     color: $color-text-secondary;

     h2 {
       font-weight: 300;
       padding-bottom: 1em;
     }

     form {
       display: flex;
       flex-wrap: wrap;

       input {
         flex-basis: 100%;
         margin-bottom: 10px !important;
       }

       .btn {
         margin: auto;
       }
     }

     .facebook {

     }

   }
 }

</style>
