<template>
  <div class="sign-in-page">
    <div class="form-container">
      <h2>Sign In</h2>
      <form>
        <input type="email" placeholder="Email" v-model="email"/>
        <input type="password" placeholder="Password" v-model="password"/>
        <div class="third-party-login-container">
          <div class="img-container">
            <img src="/images/facebook_login.png" @click="signInWithFacebook()" class="facebook"/>
          </div>
          <div class="img-container">
            <img src="/images/google_login.png" @click="signInWithGoogle()" class="google"/>
          </div>
        </div>
        <div class="btn btn-primary" @click="signInWithEmail()">Submit</div>
      </form>
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
       email: "",
       password: ""
     }
   },
   created(){

   },

   notifs(){
     return {

     }
   },
   methods: {
     signInWithEmail(){
       UserModel.signInWithEmail(this.email, this.password).then(results => {
         
       });
     },

     signInWithFacebook(){
       UserModel.signUpWithFacebook();
     },

     signInWithGoogle(){
       UserModel.signUpWithGoogle();
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
     margin-top: 6em;
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
         margin-left: auto;
       }
     }

     .third-party-login-container {
       display: flex;


       .img-container {

         img {
           width:  auto;
           max-height: 50px;
           cursor: pointer;
         }
       }
     }
   }
 }

</style>
