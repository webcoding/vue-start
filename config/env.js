
// ENV

var merge = require('webpack-merge')
// import { makeMap } from 'shared/util'
// import { makeMap } from '../shared/util'

// const evnList = 'dev,testing,prod'
// const isRightEnv = makeMap(evnList)
const apis = {
  dev: 'http://m.devapi.haoshiqi.net',
  testing: 'http://m.devapi.haoshiqi.net',
  prod: 'https://m.api.haoshiqi.net',
}
const qn = {
  prod: '',
  dev: '',
}
const prodEnv = {
  debug: false,
  port: 8001,
  name: 'prod',
  NODE_ENV: '"prod"',
  routerMode: 'history',
  social: {
    facebook: '',
    twitter: '',
    github: '',
  },
  qn: qn.prod,
}

function createEnv (env) {
  if (env === 'prod') return prodEnv
  return merge(prodEnv, {
    debug: true,
    name: env,
    NODE_ENV: `"${env}"`,
    routerMode: 'hash',
    qn: qn.dev,
  })
}

// const inputEnv = process.env.NODE_ENV

// if (isRightEnv(inputEnv)) {
//   new Error(inputEnv + '不是有效的环境变量，请选用' + evnList)
// }

module.exports = {
  dev: createEnv('dev'),
  testing: createEnv('testing'),
  prod: createEnv('prod'),
  apis: apis,
}
