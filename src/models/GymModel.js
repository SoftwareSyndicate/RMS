import Notifications from 'services/NotificationService'

class GymModel {
  constructor(){
    this.currentGym = null;
    this.gyms = [];
    this.addListeners();
  }

  addListeners(){
    let gymRef = firebase.database().ref('gyms');
    gymRef.on('value', data => {
      this.gyms = [];
      for(var key in data.val()){
        this.gyms.push(data.val()[key])
      }
      Notifications.notify("GymModel.gymsUpdated")
    });
  }

  createGym(gym){
    let newGymKey = firebase.database().ref().child('gyms').push().key;
    var updates = {};
    updates['/gyms/' + newGymKey] = gym;
    return firebase.database().ref().update(updates);
  }

}

export default new GymModel();
