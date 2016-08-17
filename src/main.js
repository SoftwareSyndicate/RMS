require('file?name=[name].[ext]!../index.html'); // copy the index.html file

import $ from 'jquery'
window.$ = $;

import Vue from 'vue'
import RouterService from './services/RouterService.js'
import Filters from './filters/filters.js'
import SBPFilters from './SBP/src/filters/filters.js'
import App from './components/App.vue'

import Chart from 'chart.js'
import chartConfig from './libs/chartConfig.js'
import Notifications from './services/NotificationService.js'

Vue.config.warnExpressionErrors = false
Vue.config.debug = false

// install Router
var router = RouterService.initRoutes();

//TODO REMOVE THIS SOMEHOW
let loaded = false;
Notifications.listenFor("UserModel.userUpdated", () => {
  if(!loaded){
    router.start(App, '#app');
    loaded = true;
  }
});

//TODO REMOVE THIS SOMEHOW
window.colorMappings = {
  gray: "rgba(209,209,209, 0.8)",
  yellow: "rgba(255,210,28, 0.8)",
  green: "rgba(5,179,99, 0.9)",
  red: "rgba(243,23,38, 0.8)",
  blue: "rgba(48,99,245, 0.8)",
  orange: "rgba(252,109,33, 0.8)",
  purple: "rgba(183,22,229,0.8)",
  black: "rgba(33,33,33,0.9)"
}

window.gymId = "-KLi8WWAMzuH1k4mlkbj";
