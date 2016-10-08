<script>
import Vue from 'vue'
import Notifications from '../../services/NotificationService.js'

var BaseComponent = Vue.extend({
  name: 'BaseComponent',
  props:['autoLoad'],
  created(){

    // custom loading of declared notifications
    if(this.$options.notifs){
      for(let key in this.$options.notifs()){
        let f = this.$options.notifs()[key];
        Notifications.listenFor(key, this.$options.methods[f], this);
      }
    }
  },

  ready(){
    // make all components have a jquery wrapped version of their element

    // start the component with the local loading animation
    // if hide has not yet been called
    if(this.autoLoad && !this.autoLoaded){
      this.showLoadingAnimation(true);
      this.autoLoaded = true;
    }
  },

  data(){
    return {
      notifications: Notifications
    };
  },

  beforeDestroy(){
    // custom unloading of declared notifications
    if(this.$options.notifs){
      for(let key in this.$options.notifs()){
        let f = this.$options.notifs()[key];
        Notifications.removeListener(key, this.$options.methods[f]);
      }
    }
  },

  methods: {
    showLoadingAnimation(local = false){
      if(!local){
        Notifications.notify('Overlay.setVisible', true);
      } else {
        // console.log('show local overlay', this.$options.name);
        this._baseOverlay = this._baseOverlay || createOverlay();
        $(this.$el).css('position', 'relative').append(this._baseOverlay);
        this._isLoading = true;
      }
    },
    hideLoadingAnimation(local = false){
      if(!local){
        Notifications.notify('Overlay.setVisible', false);
      } else {
        // console.log('hide local overlay');
        if(this._isLoading){
          this._isLoading = false;
          $(this.$el).css('position', '');
          this._baseOverlay = this._baseOverlay.detach();
        }
        if(this.autoLoad && !this.autoLoaded){
          this.autoLoaded = true;
        }
      }
    },
    showRefLoadingAnimation(refName){
      if(this.$refs.hasOwnProperty(refName)){
        this.$refs[refName].showLoadingAnimation(true);
      }
    },
    hideRefLoadingAnimation(refName){
      if(this.$refs.hasOwnProperty(refName)){
        this.$refs[refName].hideLoadingAnimation(true);
      }
    },
    openModal(name, options, ...rest){
      Notifications.notify('ModalLoader.loadModal', name, options, ...rest);
    },
    share(){
      html2canvas(this.$el).then(canvas => {
        var componentImage = canvas.toDataURL();
        this.notifications.notify('ShareModal.open', componentImage);
      });
    },
    maximize(){

    },
    $toast(message, duration = 2000, ...rest){
      Materialize.toast(message, duration, ...rest);
    },
    $error(message, duration = 2000, cls = '', ...rest){
      cls = cls + " error";
      Materialize.toast(message, duration, cls.trim(), ...rest);
    }
 }
})

export default BaseComponent
</script>
