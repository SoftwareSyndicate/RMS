import Notifications from '../services/NotificationService'

class UserModel {
  constructor(){
    this.currentUser = null;
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.firebaseUser = user;
        this.watchCurrentUser(user.uid);
      } else {
        this.currentUser = null;
        Notifications.notify("UserModel.userUpdated", this.currentUser);
      }
    });

    this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
  }

  createUser(uid){
    let newUserKey = firebase.database().ref().child('users').push().key;
    let now = new Date().getTime();
    let user = {
      uid: uid,
      id: newUserKey,
      created_at: now,
      updated_at: now
    };

    var updates = {};
    updates['/users/' + newUserKey] = user;
    return firebase.database().ref().update(updates);
  }

  watchCurrentUser(uid){
    this.currentUserRef = firebase.database().ref("users").orderByChild("uid").equalTo(uid);
    this.currentUserRef.on('value', data => {
      this.currentUser = data.val()[Object.keys(data.val())[0]];
      Notifications.notify("UserModel.userUpdated", this.currentUser);
    });
  }


  signInWithEmail(email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      return error;
    }).then(results => {
      this.currentUser = {};
      this.watchCurrentUser(firebase.auth().currentUser.uid);
      Notifications.notify("UserModel.signIn", this.currentUser);
      return results;
    });
  }

  signOut(){
    return firebase.auth().signOut().then(results => {
      this.currentUser = null;
      Notifications.notify("UserModel.signOut");
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

  updateUser(user, updates){
    return user.updateProfile(updates).then(() => {
      this.currentUser = firebase.auth().currentUser;
      Notifications.notify("UserModel.userUpdated");
      console.log(this.currentUser);
      return this.currentUser;
    }, error => {
      return error;
    });
  }
}

export default new UserModel();
