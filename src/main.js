// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import newStore from './components/newStore'
import mainPage from './components/mainPage'
import storeList from './components/storeList'

Vue.use(VueRouter);


const routes = [
  { path: '/', component: mainPage },
  { path: '/storeList/:type', component: storeList },
  { path: '/newStore', component: newStore },


  { path: '/:type', component: mainPage }
];

const router = new VueRouter({
  routes:routes
});
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router:router,
  mounted:function(){
    //router.push('/');
  }
});
//
