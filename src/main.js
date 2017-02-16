// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import newStore from './components/newStore'
import mainPage from './components/mainPage'
import addSuccess from './components/addSuccess'
import noStore from './components/noStore'
import storeList from './components/storeList'
import storeDetail from './components/storeDetail'
import comment from './components/comment'
import commentSuccess from './components/commentSuccess'
import commentFailed from './components/commentFailed'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: mainPage },
  { path: '/storeDetail/:id', component: storeDetail },
  { path: '/storeList/:type', component: storeList },
  { path: '/storeList/search/noStore', component: noStore},
  { path: '/storeList/search/:keyword', component: storeList },
  { path: '/newStore', component: newStore },
  { path: '/newStore/addSuccess', component: addSuccess},
  { path: '/comment/success', component: commentSuccess},
  { path: '/comment/failed', component: commentFailed},
  { path: '/comment/:id', component: comment},
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
