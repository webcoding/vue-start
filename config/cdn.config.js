var QiniuPlugin = require('qiniu-webpack-plugin')
var ASKey = require('./cdn.private')
var curASKey = ASKey['prod'] || {}

// 七牛 CDN
var cdnList = {
  cdn: {
    bucket: 'xxx',  // your bucket name
    domain: 'https://img.xxx.com/', //xxxx.xxx.xx.glb.clouddn.com
    prefix: '',     // 路径前缀，如 zt/
  },
}

// 这里配置 Plugin
var qiniuPlugin = function(cdn){
  return new QiniuPlugin({
    ACCESS_KEY: curASKey.ak,
    SECRET_KEY: curASKey.sk,
    bucket: cdn.bucket,
    prefix: cdn.key,
  });
}

// cdn资源合一
var cdnConfig = {
  create: function(key) {
    var cdn = cdnList[key]
    if(!cdn) {
      key = 'cdn';
      cdn = cdnList[key]
      console.info('使用默认cdn')
    }
    return {
      publicPath: cdn.domain + cdn.prefix,
      plugins: [
        qiniuPlugin(key),
      ],
    };
  },
}

// console.log(cdnConfig.get('cdn'))

module.exports = cdnConfig
