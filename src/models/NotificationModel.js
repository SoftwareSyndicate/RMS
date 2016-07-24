import Notifications from 'services/NotificationService'

class NotificationModel {
  constructor(){
    this.notificatons = [];
  }

  updateRoutes(){
    var updates = {};

    this.routes.forEach(route => {
      console.log(route);
      /* updates['/routes/' + route.id] = route; */
    });
  }

  updateRoute(route){
    var updates = {};
    updates['/routes/' + route.id] = route;
    return firebase.database().ref().update(updates);
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

  createNotification(author, body){
    let newNotificationKey = firebase.database().ref().child('notifications').push().key;
    let now = new Date().getTime();
    let notification = {
      id: newNotificationKey,
      wall_id: wallId,
      created_at: now,
      updated_at: now,
      author: author
    };

    var updates = {};
    updates['/notifications/' + newNotificationKey] = notification;
    return firebase.database().ref().update(updates);
  }

  deleteRoute(id){
    let routesRef = firebase.database().ref('routes/' + id);
    return routesRef.remove().then(() => {
      Notifications.notify("RouteModel.routesUpdated")
    }).catch(error => {
      return Promise.reject(error);
    });
  }
}

export default new NotificationModel();
