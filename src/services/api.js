
import axios from 'axios'
// import fetchApi from '@common/services/fetch-api'
import mock from './mock'
import env from '@/setting/env'

// function parseResponse(response) {
//   return Promise.all([response.status, response.statusText, response.json()])
// }

function checkStatus({ status, statusText, data }) {
  if (status >= 200 && status < 300) {
    // 请求成功
    // console.log('请求成功: ')
    // console.log(data)
    return data
  } else {
    const error = new Error(statusText)
    error.status = status
    error.message = data
    return Promise.reject(error)
  }
}

// const apiPath = '/bookmark'
// var buildUrl = function (url) {
//   return apiPath + url
// }
// const proxyPath = process.env.NODE_ENV === 'production' ? '' : '/proxy'

// // 发送一个 get 请求
// axios.get('package.json')
//     .then((res) => {
//       console.log(res)
//     })
//     .catch((err) => {
//       console.log(err)
//     })

/**
 * 创建临时数据
 */
const setPromise = data => {
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}

// let modal = {
//   getTopicList(data) {
//     return api.get('/product/topicskusinfo', data)
//   },
// }

// https://github.com/mzabriskie/axios
// 创建一个实例，并进行默认设置

var ajax = axios.create({
  baseURL: `${env.apiBaseUrl}`,
  timeout: 15000,
  withCredentials: true,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    // 'Accept': 'application/json',
    // 'dataType': 'json',
    // 'Content-Type': 'application/json; charset=utf-8',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'text/html; charset=UTF-8',
  },
})

ajax.form = function (url, data) {
  return ajax.post(url, data, {
    transformRequest: [function (data) {
      // Do whatever you want to transform the data
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

// 添加请求拦截器
ajax.interceptors.request.use((config) => {
  // 在发送请求之前做某事
  return config
}, function (error) {
  // 请求错误时做些事
  return Promise.reject(error)
})

// 添加响应拦截器
ajax.interceptors.response.use((response) => {
  // 对响应数据做些事
  return checkStatus(response)
}, function (error) {
  // 请求错误时做些事
  return Promise.reject(error)
})

// const AUTH_TOKEN = ''

// ajax.fetch = function ajaxFetch(url, params) {
//   const method = data.method || 'get'
//   switch (method) {
//     case 'get':
//     case 'post':
//     case 'delete':
//     case 'put':
//     case 'patch':
//       delete data.method
//       return ajax[method](arguments)
//   }
// }

// 编译环境使用真实数据
const ajaxApi = {
  getBookmarks(data) {
    return ajax.get('/bookmark', data)
  },
  // getBookmarks: () => setPromise(mock.bookmarks),
  getTags(data) {
    return ajax.get('/tag', data)
  },
  // data = {
  //   params: {
  //     keyword: this.keyword,
  //   },
  // }
  getSupport(data) {
    return ajax.get('/tag/search', data)
  },
  // getTags: () => setPromise(mock.tags),
  getBookmarksWithTag(data) {
    return ajax.get('/bookmark/tag', data)
  },
  addBookmark(data) {
    return ajax.form('/bookmark/create', data)
  },
  addTag(data) {
    return ajax.form('/tag/create', data)
  },
  login(data) {
    return ajax.form('/login', data)
  },
  logout() {
    return ajax.get('/logout')
  },
  checkLogin() {
    return ajax.get('/login/check')
  },
  getHelps: () => setPromise(mock.helps),
  // getAboutMe(data) {
  //   return ajax.get('me')
  // },
  // getPost(id) {
  //   return ajax.get(`articles/${id}`)
  // },
  // getPostList(data) {
  //   return ajax.get('articles', data)
  // },
  // getAllTags(data) {
  //   return ajax.get('tags')
  // },
}

if (process.env.NODE_ENV === 'development') {
  // console.log('开发环境使用 fake 数据')

  // 在实例创建之后改变默认值
  // ajax.defaults.headers.common['Authorization'] = AUTH_TOKEN
} else {
  // console.log('编译环境使用真实数据')
  // 在实例创建之后改变默认值
  // ajax.defaults.baseURL = `${env.apiBaseUrl}/bookmark`
}

export default ajaxApi
