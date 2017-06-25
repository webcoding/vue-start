
import merge from 'lodash/merge'

const baseEnv = {
  // origin: '',
  // api: '',
  port: 8001,
  debug: false,
  routerMode: 'history',
  defaultRequest: {
    headers: {
      'X-Requested-With': 'rest.js',
      'Content-Type': 'application/json',
    }
    timeout: 15000,
  },
  publicPath: '',                   // build
  apiPath: '',                      // /api
  googleAnalyticsId: 'UA-XXXXX-X',
  baiduAnalyticsId: 'UA-XXXXX-X',
  baseUrl: '',
  apiBaseUrl: '',
}

const regLocal = /^(localhost|10\.0|127\.0|192\.168)/i
const host = window.location.host
export function createEnv(opts = {}) {
  var options = {
    baseUrl: opts.origin,
    apiBaseUrl: opts.api,
  }
  if (host.match(regLocal)) {
    options = merge(options, {
      baseUrl: `${devHost}/#`,
      apiBaseUrl: `${devHost}/proxy`,
      routerMode: 'hash',
      debug: true,
    })
  }
  return merge(baseEnv, opts, options)
}
import config from './system'

// 默认会有个 api 配置，之后会读取 store
export default {
  prod: config.prod,
  dev: createEnv(config.dev),
  beta: createEnv(config.beta),
  test: createEnv(config.test),
}
