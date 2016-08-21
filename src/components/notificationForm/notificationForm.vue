<template>
  <div class="notification-form">
    <div class="form-header">
      <div class="avatar">

      </div>
      <div class="user-dropdown">
        {{user.first_name + " " + user.last_name}}
      </div>
      <div class="date">
        {{currentDateString}}
      </div>
    </div>
    <div class="form-body">
      <iframe v-if="notif.type === 'video' && hasVideo" :src="'https://www.youtube.com/embed/' + notif.video" frameborder="0"> </iframe>
      <textarea placeholder="Type a message..." v-model="notif.text"></textarea>
    </div>
    <div class="form-footer">
      <div class="form-icons">
        <div class="form-icon" v-bind:class="{'active': notif.type == 'text'}" @click="changeType('text')">
          <i class="material-icons">text_format</i>
        </div>
        <div class="form-icon" v-bind:class="{'active': notif.type == 'video'}" @click="changeType('video')">
          <i class="material-icons">videocam</i>
        </div>
        <div class="form-icon" v-bind:class="{'active': notif.type == 'photo'}" @click="changeType('photo')">
          <i class="material-icons">insert_photo</i>
        </div>
        <div class="form-icon wall-tag" v-bind:class="{'active': notif.type == 'wall'}" @click="changeType('wall')">
          wall
        </div>
      </div>
      <div class="btn btn-primary" @click="createNotification(notif)">
        Send
      </div>
    </div>

    <div class="video-select-modal" v-show="showVideoSelect" transition="modal">
      <div class="modal-wrapper" @click="showVideoSelect = false">
        <div class="modal-container" @click.stop="">
          <h2>Add Video URL</h2>
          <input v-model="videoURL" placeholder="Video URL">
          <div class="btn btn-primary" @click="saveVideo()">Save</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'

 export default BaseComponent.extend({
   name: 'NotificationForm',
   props: {
     notif: {
       type: Object,
       default: () => {}
     },
     createNotification: {},
     user: {
       type: Object,
       default: () => {}
     }
   },
   data(){
     return {
       showVideoSelect: false,
       currentDateString: "",
       videoURL: "",
       hasVideo: false
     }
   },
   created(){
     let options = {year: 'numeric', day: 'numeric', month: 'short'};
     let now = new Date();
     this.currentDateString = now.toLocaleDateString('en-US', options);
   },
   ready(){

   },

   methods: {
     changeType(type){
       this.notif.type = type;

       if(type === "video"){
         this.showVideoSelect = true;
       }
     },

     saveVideo(){
       this.notif.video = this.videoURL.split("v=")[1]
       console.log(this.notif);
       this.hasVideo = true;
       this.showVideoSelect = false;
     }
   }
 });

</script>


<style lang="scss">
 @import '../../styles/vars.scss';

 .notification-form {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   border: $default-thin-border;

   .form-header {
     display: flex;
     flex-grow: 1;
     flex-basis: 100%;
     padding: 1em;
     align-items: center;
     border-bottom: $default-thin-border;

     .avatar {

     }

     .user-dropdown {

     }

     .date {
       margin-left: auto;
       font-size: .8em;
       color: rgba(0, 0, 0, .75);
     }
   }

   .form-body {
     display: flex;
     flex-wrap: wrap;
     flex-grow: 1;
     flex-basis: 100%;
     border-bottom: $default-thin-border;

     iframe {
       flex-basis: 100%;
       min-height: 250px;
       padding: 1em;
       font-size: .9em;
       resize: none;
       border-bottom: $default-thin-border;
     }

     textarea {
       flex-basis: 100%;
       min-height: 100px;
       padding: 1em;
       resize: none;
     }

   }

   .form-footer {
     display: flex;
     flex-grow: 1;
     flex-basis: 100%;
     padding: 1em;
     background-color: $color-background;

     .btn {
       margin-left: auto;
       font-size: 12px;
       height: 15px;
       padding-top: 4px;
       padding-bottom: 4px;
     }

     .form-icons {
       display: flex;
       align-items: center;

       .form-icon {
         height: 24px;
         padding-right: 1.5em;
         color: rgba(0, 0, 0, .2);

         &.active {
           color: $color-2;
         }
       }

       .wall-tag {
         display: flex;
         align-items: center;
         height: 24px;
         background-color: rgba(0, 0, 0, .2);
         color: white;
         font-size: 14px;
         padding-right: .4em;
         padding-left: .4em;

         &.active {
           background-color: $color-2;
           color: white;
         }
       }
     }
   }

   .video-select-modal {
     position: fixed;
     z-index: 9998;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0, 0, 0, .5);
     display: table;
     transition: opacity .3s ease;

     .modal-wrapper {
       display: table-cell;
       vertical-align: middle;
     }

     .modal-container {
       justify-content: center;
       display: flex;
       flex-wrap: wrap;
       flex-grow: 1;
       width: 70%;
       margin: 0px auto;
       padding: 2em 3em;
       background-color: #fff;
       border-radius: 2px;
       box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
       transition: all .3s ease;
       font-family: Helvetica, Arial, sans-serif;

       h2 {
         font-weight: 300;
         flex-basis: 100%;
         flex-grow: 1;
         margin-bottom: 1em;
       }

       input {
         margin-bottom: 1rem;
       }

       .btn {
         margin-left: auto;
       }
     }

     &.modal-enter, &.modal-leave {
       opacity: 0;
     }

     &.modal-enter &.modal-container,
     &.modal-leave &.modal-container {
       -webkit-transform: scale(1.1);
       transform: scale(1.1);
     }
   }
 }

</style>
