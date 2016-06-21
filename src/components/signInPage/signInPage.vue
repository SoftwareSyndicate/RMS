<template>
  <div class="sign-in-page">
    <div class="component form-container">
      <h2>Sign In</h2>
      <form>
        <input type="email" placeholder="Email" v-model="email"/>
        <input type="password" placeholder="Password" v-model="password"/>
        <div class="btn btn-primary" @click="signInWithEmail()">Sign In with Email</div>
      </form>
      <div class="seperator-container">
        <div class="seperator"></div>
        <span>or</span>
        <div class="seperator"></div>
      </div>
      <div class="third-party-login-container">
        <div class="facebook">
          <img src="/images/facebook-20-20.svg" @click="signInWithFacebook()"/>
        </div>
        <div class="google">
          <img src="/images/google-20-20.svg" @click="signInWithFacebook()"/>
        </div>
      </div>
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
         flex-basis: 100%;
         width: 100%;
       }
     }

     .seperator-container {
       margin-top: 20px;
       margin-bottom: 20px;
       display: flex;

       span {
         padding-left: 10px;
         padding-right: 10px;
         color: rgba(0, 0, 0, .6);
       }

       .seperator {
         margin: 10px 0px 10px 0px;
         width: 100%;
         height: 1px;
         background-color: rgba(0, 0, 0, .2);
       }
     }

     .third-party-login-container {
       display: flex;

       .facebook {

         img {
           width:  auto;
           max-height: 50px;
           cursor: pointer;
         }
       }


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
