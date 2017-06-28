/**
 * Created by faraway on 17-6-10.
 */
import http from '../plugins/http/index'

const objectToCamel = (obj) => {
  function type () {
    return Object.prototype.toString.call(this).slice(8, -1)
  }
  function isArray (elem) {
    return type.call(elem) === 'Array'
  }
  function isObject (elem) {
    return type.call(elem) === 'Object'
  }
  function copy (obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    let name
    let target = isArray(obj) ? [] : {}
    let value
    for (name in obj) {
      value = obj[name]
      if (value === obj) {
        continue
      }
      if ((isArray(value) || isObject(value))) {
        target[toCamel(name)] = copy(value)
      } else {
        target[toCamel(name)] = value
      }
    }
    return target
  }
  function toCamel (str) {
    return str.replace(/_([a-z])/g, (m, w) => {
      return w.toUpperCase()
    })
  }
  return (copy(obj))
}

export default {
  // 检查是否登录
  async checkLoginStatus () {
    return await http.get('/api/v2/users/status').then(data => data.status)
  },
  // 获取主页内容
  async getIndex () {
    return await http.get('/api/v2/index').then(objectToCamel)
  },
  // 获取某类型店铺列表信息
  async getShopsBySubtype (subtype) {
    return await http.post('/api/v2/shops/list', {
      'request_type': 2,
      'shop_type': subtype
    }, {
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(objectToCamel)
  },
  // 根据关键词搜索店铺
  async searchShops (keyword) {
    return await http.post('/api/v2/shops/list', {
      'request_type': 3,
      'keyword': keyword
    }, {
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(objectToCamel)
  }
}
