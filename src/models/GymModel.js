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

      let i = 0;
      for(var key in data.val()){
        this.gyms.push(data.val()[key]);
        this.gyms[i].id = key;
        i++;
      }
      Notifications.notify("GymModel.gymsUpdated")
    });
  }

  watchGym(id){
    this.gymRef = firebase.database().ref('gyms/' + id);
    this.gymRef.on('value', data => {
      this.currentGym = data.val();
      Notifications.notify("GymModel.currentGymUpdated")
    });
  }

  createGym(name){
    let newGymKey = firebase.database().ref().child('gyms').push().key;
    let now = new Date().getTime();
    let gym = {
      id: newGymKey,
      name: name,
      created_at: now,
      updated_at: now
    };

    var updates = {};
    updates['/gyms/' + newGymKey] = gym;
    return firebase.database().ref().update(updates);
  }

}

export default new GymModel();
