import Notifications from 'services/NotificationService'

class WallModel {
  constructor(){
    this.currentWall = null;
    this.walls = [];
    this.addListeners();
  }

  addListeners(){
    let wallsRef = firebase.database().ref('walls');
    wallsRef.on('value', data => {
      this.walls = [];
      for(var key in data.val()){
        this.walls.push(data.val()[key])
      }
      Notifications.notify("WallModel.wallsUpdated")
    });
  }

  getWallsByGymId(id){
    this.currentWallsRef = firebase.database().ref('walls').orderByChild("gymId").equalTo(id);
    this.currentWallsRef.on('value', data => {
      this.walls = [];
      for(var key in data.val()){
        this.walls.push(data.val()[key])
      }
      console.log("WALLS", this.walls);
      Notifications.notify("WallModel.wallsUpdated")
    });
  }

  createWall(name, gymId){
    let wall = {
      name: name,
      gymId: gymId
    };

    let newWallKey = firebase.database().ref().child('walls').push().key;
    var updates = {};
    updates['/walls/' + newWallKey] = wall;
    return firebase.database().ref().update(updates);
  }

}

export default new WallModel();
