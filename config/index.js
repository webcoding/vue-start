var path = require('path')
// see http://vuejs-templates.github.io/webpack for documentation.
var env = require('./env')

// 关于项目配置，应该读取项目根目录下 config 独立配置，扩展性更好
var project = require('./project')

function resolve (dir) {
  return path.join(__dirname, '../' + dir)
}

var prodPublicPath = project.qn.domain +
        (project.isSingle ? '' : (project.dir + '/'))


// var request = require('request')
// var url = 'https://api.devnode.cn/login/check'
// request(url, (error, response, body) => {
//   console.log(error)
//   console.log(response.headers)
//   console.log(response.headers['set-cookie'])
// })

var cookie
module.exports = {
  qnConfig: project.qn,
  // target: 'web',
  appName: project.name,
  appDir: project.dir,
  index: 'index.html', // 引用文件，相对于 assetsRoot
  template: project.dir + '/index.html',
  build: {
    env: env.prod,
    // 无需编译的静态资源目录，会拷贝到 dist/assets 中
    staticPath: resolve(project.dir + '/src/assets'),
    // 编译输出，引用资源的注入
    index: resolve(project.dist + '/index.html'),
    // 所有输出文件的目标路径，必须绝对路径
    assetsRoot: resolve(project.dist),
    // 输出解析文件的目录，url 相对于 HTML 页面
    assetsSubDirectory: 'assets/',
    assetsPublicPath: prodPublicPath, // 不使用 cdn，设为空
    // assetsPublicPath: 'https://cdn.xxx.cn/' + project.dir, // 这里可以设置 cdn
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
  dev: {
    env: env.dev,
    port: project.port,
    autoOpenBrowser: true,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '',
    // https://vuejs-templates.github.io/webpack/proxy.html
    // https://github.com/chimurai/http-proxy-middleware
    proxyTable: {
      // 如果把 cookie 设置为HttpOnly，则可能无法通过代理传递 cookie
      // proxy all requests starting with /api to jsonplaceholder
      '/proxy': {
        target: env.apis['dev'],
        changeOrigin: true,
        // true/false, if you want to verify the SSL Certs
        // secure: false,
        pathRewrite: {
          '^/proxy': '',
        },
        logLevel: 'debug',
        onProxyReq: function relayRequestHeaders(proxyReq, req) {
          // console.log(proxyReq.headers)
          if (cookie) {
            proxyReq.setHeader('cookie', cookie)
          }
          // proxyReq.setHeader('Access-Control-Allow-Credentials', 'true')
        },
        onProxyRes: function relayResponseHeaders(proxyRes, req, res) {
          // console.log(proxyRes.headers)
          var proxyCookie = proxyRes.headers['set-cookie']
          if (proxyCookie) {
            cookie = proxyCookie
          }
        },
      },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true,
  },
}
