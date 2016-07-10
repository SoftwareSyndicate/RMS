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

  getRoutesByWallId(id){
    console.log(id);
    this.routesRef = firebase.database().ref('routes').orderByChild("wall_id").equalTo(id);
    this.routesRef.on('value', data => {

      this.routes = [];
      for(var key in data.val()){
        this.routes.push(this.parseRoute(data.val()[key]))
      }
      console.log("FUCKING ROUTES: ", this.routes)
      Notifications.notify("RouteModel.routesUpdated")
    });
  }

  parseRoute(route){
    route.last_set = new Date(route.last_set);
    route.created_at = new Date(route.created_at);
    route.updated_at = new Date(route.updated_at);
    return route;
  }

  createRoute(gymId, wallId, color="gray", grade="0", risk=0, intensity=0, complexity=0, exposure=0){
    let newRouteKey = firebase.database().ref().child('routes').push().key;
    let now = new Date().getTime();
    let route = {
      id: newRouteKey,
      gym_id: gymId,
      wall_id: wallId,
      created_at: now,
      updated_at: now,
      status: 0,
      color: color,
      grade: grade,
      risk: risk,
      intensity: intensity,
      complexity: complexity,
      exposure: exposure
    };

    var updates = {};
    updates['/routes/' + newRouteKey] = route;
    return firebase.database().ref().update(updates);
  }

  deleteRoute(id){
    let routesRef = firebase.database().ref('routes').orderByChild("id").equalTo(id);
    routesRef.remove();
  }
}

export default new RouteModel();
