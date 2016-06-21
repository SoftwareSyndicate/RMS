import Vue from 'vue'
import Notifications from 'services/NotificationService'


class BaseService {
  constructor(){
    this.db = firebase.database();
  }

}

export default BaseService;
