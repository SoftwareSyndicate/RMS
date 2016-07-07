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

  watchWall(id){
    this.gymRef = firebase.database().ref('walls/' + id);
    this.gymRef.on('value', data => {
      this.currentWall = data.val();
      Notifications.notify("WallModel.currentWallUpdated")
    });
  }

  getWallsByGymId(id){
    this.currentWallsRef = firebase.database().ref('walls').orderByChild("gym_id").equalTo(id);
    this.currentWallsRef.on('value', data => {
      this.walls = [];
      for(var key in data.val()){
        this.walls.push(this.parseWall(data.val()[key]))
      }
      Notifications.notify("WallModel.wallsUpdated")
    });
  }

  parseWall(wall){
    wall.last_set = new Date(wall.last_set);
    wall.created_at = new Date(wall.created_at);
    wall.updated_at = new Date(wall.updated_at);
    return wall;
  }

  createWall(name, gymId){
    let newWallKey = firebase.database().ref().child('walls').push().key;
    let now = new Date().getTime();
    let wall = {
      id: newWallKey,
      name: name,
      gym_id: gymId,
      last_set: now,
      created_at: now,
      updated_at: now
    };


    var updates = {};
    updates['/walls/' + newWallKey] = wall;
    return firebase.database().ref().update(updates);
  }

}

export default new WallModel();
