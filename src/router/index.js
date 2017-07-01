import Vue from 'vue'
import Router from 'vue-router'

import entry from '../pages/entry/entry.vue'
import search from '../pages/search/search.vue'
import shopList from '../components/shop-list.vue'
import list from '../pages/list/list.vue'

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
      path: '/search',
      component: search,
      children: [
        {
          path: ':keyword',
          component: shopList
        }
      ]
    },
    {
      path: '/list/:type',
      component: list,
      children: [
        {
          path: ':subtype',
          component: shopList
        }
      ]
    }
  ]
})
