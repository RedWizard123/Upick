/**
 * Created by faraway on 17-6-10.
 */
import http from '../plugins/http/index'

const root = '/api/v2'

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

// 检查是否登录
export async function checkLoginStatus () {
  return await http.get(`${root}/users/status`).then(data => data.status)
}
// 获取主页内容
export async function getIndex () {
  return await http.get(`${root}/index`).then(objectToCamel)
}
// 获取某类型店铺列表信息
export async function getShopsBySubtype (subtype) {
  return await http.post(`${root}/shops/list`, {
    'request_type': 2,
    'shop_type': subtype
  }, {
    headers: {
      'content-type': 'application/json'
    }
  }).then(objectToCamel)
}
// 根据关键词搜索店铺
export async function searchShops (keyword) {
  return await http.post(`${root}/shops/list`, {
    'request_type': 3,
    'keyword': keyword
  }, {
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(objectToCamel)
}
export async function waitImageToLoad (imageNode) {
  return new Promise((resolve, reject) => {
    if (imageNode.complete) {
      resolve(imageNode)
    } else {
      imageNode.onload = () => {
        resolve(imageNode)
      }
      imageNode.onerror = (error) => {
        reject(error)
      }
    }
  })
}
