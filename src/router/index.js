import Vue from 'vue'
import Router from 'vue-router'

import entry from '../pages/entry/entry.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: entry
    }
  ]
})
