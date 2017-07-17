import Vue from 'vue'
import Router from 'vue-router'

import entry from '../pages/entry/entry.vue'
import search from '../pages/search/search.vue'
import shopList from '../components/shop-list.vue'
import list from '../pages/list/list.vue'
import comment from '../pages/comment/comment.vue'
import result from '../pages/result/result.vue'
import detail from '../pages/detail/detail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: entry
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
          path: '/',
          component: shopList
        },
        {
          path: ':subtype',
          component: shopList
        }
      ]
    },
    {
      path: '/comment/:name',
      component: comment
    },
    {
      path: '/result/:status/:name',
      component: result
    },
    {
      path: '/detail/:name',
      component: detail
    }
  ]
})
