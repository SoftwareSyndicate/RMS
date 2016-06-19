require('file?name=[name].[ext]!../index.html'); // copy the index.html file

import $ from 'jquery'
window.$ = $;

import Vue from 'vue'
import RouterService from './services/RouterService.js'
import Filters from './filters/filters.js'
import App from './components/App.vue'


import Chart from 'chart.js'
import chartConfig from './libs/chartConfig.js'

Vue.config.warnExpressionErrors = false
Vue.config.debug = false

// install Router
var router = RouterService.initRoutes();
router.start(App, '#app');
