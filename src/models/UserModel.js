import UserService from '../services/UserService.js'
import Notifications from 'services/NotificationService'

class UserModel {
  constructor(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.currentUser = user;
        console.log(this.currentUser);
        Notifications.notify("UserModel.userLogin", this.currentUser);
      } else {
        this.currentUser = null;
      }
    });

    this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
  }

  signInWithEmail(email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      return error;
    }).then(results => {
      this.currentUser = firebase.auth().currentUser;
      Notifications.notify("UserModel.userLogin", this.currentUser);
      return results;
    });
  }

  signOut(){
    return firebase.auth().signOut().then(function() {
      this.currentUser = null;
      return true;
    }, function(error) {
      return error;
    });
  }

  //Sign Up
  signUpWithEmail(email, password){
    return firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      return error;
    });
  }


  signUpWithGoogle(){
    return firebase.auth().signInWithPopup(this.googleAuthProvider).then(function(result) {
      this.currentUser = result.user;
      return this.currentUser;
    }).catch(function(error) {
      return error;
    });
  }

  signUpWithFacebook(){
    firebase.auth().signInWithPopup(this.facebookAuthProvider).then(function(result) {
      this.currentUser = result.user;
      return this.currentUser;
    }).catch(function(error) {
      return error;
    });
  }
}

export default new UserModel();
