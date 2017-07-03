/**
 * Created by faraway on 17-6-10.
 */

import axios from 'axios'

const errMsg = res => `${res.status} ${res.statusText}`

const not200Handler = (res) => {
  if (res.status !== 200) {
    return Promise.reject(errMsg(res))
  } else {
    return res
  }
}

const resBodyHandler = (res) => {
  if ('data' in res) {
    if ('status' in res.data) {
      if (res.data.status === 200) {
        return res.data.data
      } else {
        return Promise.reject(res.data.data)
      }
    }
  }
  return Promise.reject(errMsg(res))
}

export default {
  install (Vue) {
    const { get, post } = {
      get (url, ...params) {
        return axios.get(url, ...params)
          .then(not200Handler)
          .then(resBodyHandler)
      },
      post (url, data, ...params) {
        return axios.post(url, data, ...params)
          .then(not200Handler)
          .then(resBodyHandler)
      }
    }
    Vue.prototype.$get = get
    Vue.prototype.$post = post
    Vue.prototype.$http = { get, post }
    Vue.get = get
    Vue.post = post
    Vue.http = { get, post }
  },
  /**
   * @param {string} url
   * @param params
   * @returns {Promise<Object>}
   */
  get (url, ...params) {
    return axios.get(url, ...params)
      .then(not200Handler)
      .then(resBodyHandler)
  },
  /**
   * @param {string} url
   * @param {any} data
   * @param params
   * @returns {Promise<Object>}
   */
  post (url, data, ...params) {
    return axios.post(url, data, ...params)
      .then(not200Handler)
      .then(resBodyHandler)
  }
}
