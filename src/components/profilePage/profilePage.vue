<template>
  <div class="profile-page">
    <div class="person">
      <div class="img-container">
        <img v-bind:src="profile.picture" v-if="profile.picture"/>
        <img src="/images/default_avatar.jpg" v-else/>
      </div>
      <h3 class="name" v-if="profile.displayName">{{profile.displayName}}</h3>
      <h3 class="name" v-else>Setter</h3>
      <h3 class="email">{{profile.email}}</h3>
      <h3 class="joined">Joined: {{profile.created_at}}</h3>
      <div class="btn btn-primary" @click="signOut()">sign out</div>
    </div>
    <div class="info">
      total routes
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'

 export default BaseComponent.extend({
   name: 'ProfilePage',
   components: {

   },
   data(){
     return {
       profile: UserModel.currentUser
     }
   },
   created(){
     console.log(this.profile);
   },

   ready(){
     this.notifications.notify("Navbar.setHeader", "Profile");
   },
   notifs(){
     return {

     }
   },
   methods: {
     signOut(){
       UserModel.signOut();
       this.$router.go({"name": "signIn"});
     }
   }
 });

</script>


<style lang="scss">
 @import '../../styles/main.scss';

 .profile-page {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   margin-top: $page-margin-top;

   .person {
     display: flex;
     flex-wrap: wrap;
     justify-content: center;
     flex-basis: 40%;

     .img-container {
       display: flex;
       flex-basis: 100%;
       padding-bottom: 1em;

       img {
         height: 150px;
       }
     }

     .name {
       flex-basis: 100%;
       font-size: 2em;
       font-weight: 300;
       margin-bottom: .2em;
     }

     .email {
       flex-basis: 100%;
       font-size: 1em;
       font-weight: 300;
       margin-bottom: .5em;
     }

     .joined {
       flex-basis: 100%;
       font-size: 1em;
       font-weight: 300;
       margin-bottom: 1.5em;
     }

     .btn {
       margin-right: auto;
     }
   }

   .info {
     display: flex;
     flex-basis: 60%;
     flex-grow: 1;
   }
 }

</style>
