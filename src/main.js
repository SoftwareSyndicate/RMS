require('file?name=[name].[ext]!../index.html'); // copy the index.html file

import Vue from 'vue'
import RouterService from './services/RouterService.js'
import Filters from './filters/filters.js'
import App from './components/App.vue'

import Notifications from './services/NotificationService'
import Chart from 'chart.js'
import chartConfig from './libs/chartConfig.js'

// put the Notifications on the window for dev
window.Notifications = Notifications;

// install Router
var router = RouterService.initRoutes();
router.start(App, '#app');
