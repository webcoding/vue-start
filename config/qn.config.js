'use strict'

var ASKey = require('./qn.private')
var curASKey = ASKey['prod'] || {}

var qnConfig = {
  // cdn资源合一
  cdn: {
    prefix: '',
    ak: curASKey.ak,
    sk: curASKey.sk,
    bucket: 'xxx', // your bucket name
    domain: 'https://img.xxx.com/', // xxxx.xxx.xx.glb.clouddn.com
    path: '', // [hash]
  },
  // ...
}

module.exports = qnConfig
