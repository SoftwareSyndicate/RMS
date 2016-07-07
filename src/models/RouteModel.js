import Notifications from 'services/NotificationService'

class RouteModel {
  constructor(){
    this.routes = [];
  }

  addListeners(){
    let wallsRef = firebase.database().ref('walls');
    wallsRef.on('value', data => {
      this.routes = [];
      for(var key in data.val()){
        this.routes.push(data.val()[key])
      }
      Notifications.notify("RouteModel.routesUpdated")
    });
  }

  getRoutesByWalld(id){
    this.routesRef = firebase.database().ref('routes').orderByChild("wall_id").equalTo(id);
    this.routesRef.on('value', data => {
      this.routes = [];
      for(var key in data.val()){
        this.routes.push(this.parseRoute(data.val()[key]))
      }
      Notifications.notify("RouteModel.routesUpdated")
    });
  }

  parseRoutes(wall){
    wall.last_set = new Date(wall.last_set);
    wall.created_at = new Date(wall.created_at);
    wall.updated_at = new Date(wall.updated_at);
    return wall;
  }

  createRoute(wallId, color="gray", grade="0", risk=0, intensity=0, complexity=0){
    let newRouteKey = firebase.database().ref().child('routes').push().key;
    let now = new Date().getTime();
    let route = {
      id: newRouteKey,
      wall_id: wallId,
      created_at: now,
      updated_at: now,
      color: color,
      grade: grade,
      risk: risk,
      intensity: intensity,
      complexity: complexity
    };

    var updates = {};
    updates['/routes/' + newRouteKey] = route;
    return firebase.database().ref().update(updates);
  }

}

export default new RouteModel();
