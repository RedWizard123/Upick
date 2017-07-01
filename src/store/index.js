/**
 * Created by faraway on 17-6-10.
 */
import Vue from 'vue'
import Vuex from 'vuex'
// import http from '../plugins/http

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // todo
    cachedRequest: [],
    cachedShops: [],
    subtypeShopList: [], // 子店铺类别下的所以子店铺
    slogan: '', // 我们的 slogan
    currentShop: '', // 查看详情 评价 的目标
    userInfo: {}
  },
  mutations: {
    // todo
    cacheShop (state, ...shop) {
      state.push(...shop)
    }
  },
  getters: {
    // todo
  },
  actions: {
    // todo
  }
})
