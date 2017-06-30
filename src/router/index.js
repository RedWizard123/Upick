import Vue from 'vue'
import Router from 'vue-router'

import entry from '../pages/entry/entry.vue'
import search from '../pages/search/search.vue'
import shopList from '../components/shop-list.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: entry
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/search/:keyword',
      component: search,
      children: [
        {
          path: '/',
          component: shopList
        }
      ]
    }
  ]
})
