// The Vue build version to load with the `var` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
var Vue = require('vue');
var VueRouter = require('vue-router');
var VuePreview = require('vue-preview');

// import VueRouter from 'vue-router'
// import VuePreview from 'vue-preview'

var App = require('./App.vue');
var newStore = require('./components/newStore.vue');
var mainPage = require('./components/mainPage.vue');
var addSuccess = require('./components/addSuccess.vue');
var noStore = require('./components/noStore.vue');
var storeList = require('./components/storeList.vue');
var storeDetail = require('./components/storeDetail.vue');
var comment = require('./components/comment.vue');
var mark = require('./components/mark.vue');
var commentSuccess = require('./components/commentSuccess.vue');
var commentFailed = require('./components/commentFailed.vue');

Vue.use(VueRouter);
Vue.use(VuePreview.default);
var routes = [
  { path: '/', component: mainPage },
  { path: '/storeDetail/:id', component: storeDetail },
  { path: '/storeList/:type', component: storeList },
  { path: '/storeList/search/noStore', component: noStore},
  { path: '/storeList/search/:keyword', component: storeList },
  { path: '/newStore', component: newStore },
  { path: '/newStore/addSuccess', component: addSuccess},
  { path: '/comment/success/:id', component: commentSuccess},
  { path: '/comment/failed/:id', component: commentFailed},
  { path: '/comment/mark/:id/:title/:tags/:comment', component: mark},
  { path: '/comment/:id', component: comment},
  { path: '/:type', component: mainPage }
];

var router = new VueRouter({
  routes: routes
});
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App: App },
  router: router
});
