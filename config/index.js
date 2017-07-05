var path = require('path')

const apiConfig = require('./api.config')
const envConfig = require('./env.config')
const cdnConfig = require('./cdn.config')
// const targetConfig = require('./target.config')

/**
 * 一些配置
 * 环境变量 env: dev,prod,testing
 * 运行模式 mode: client,server
 * 运行时类型 target: web,node,weex,hybrid
 */

// 使用 __dirname 而不是process.cwd()，好处是前者配置稳定，运行命令时在根目录或子目录都可以运行
//
function resolve (dir) {
  return path.join(__dirname, '../' + dir)
}
var useCdn = true

const appName = 'app'
const project = {
  name: appName,
  dir: appName,
  root: resolve('./'),
  src: resolve('./src'),
  dist: resolve('./dist/' + appName),
}
const CDN = cdnConfig.create(appName);
if(!useCdn){
  CDN.plugins = [];
}
console.log(project)

var cookie;
module.exports = {
  appName: project.name,
  appRoot: project.root,
  appSrc: project.src,
  index: 'index.html', // 引用文件，相对于 assetsRoot
  template: project.root + '/index.html',
  entry: project.src,  // './src/index.js'
  alias: {
    '@': resolve('src'),
  },
  injectConst: {
    isDev: '',
    isHybrid: '',
  },
  build: {
    env: envConfig['prod'],
    mode: 'client',
    target: 'web',
    // 无需编译的静态资源目录，会拷贝到 dist/assets 中
    staticPath: resolve('/src/assets'),
    // 编译输出，引用资源的注入
    index: project.dist + '/index.html',
    // 所有输出文件的目标路径，必须绝对路径
    assetsRoot: project.dist,
    // 输出解析文件的目录，url 相对于 HTML 页面
    assetsSubDirectory: 'assets/',
    // 发布的资源路径，可以设置 CDN，不使用 cdn，设为空
    // 如 'https://cdn.xxx.cn/xxx/path'
    assetsPublicPath: useCdn ? CDN.publicPath : '',
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
    plugins: [
      ...CDN.plugins,
    ],
  },
  dev: {
    port: envConfig['dev'].port,
    env: envConfig['dev'],
    mode: 'client',
    target: 'web',
    api: apiConfig['dev'],
    autoOpenBrowser: true,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '',
    // https://vuejs-templates.github.io/webpack/proxy.html
    // https://github.com/chimurai/http-proxy-middleware
    proxyTable: {
      // 如果把 cookie 设置为HttpOnly，则可能无法通过代理传递 cookie
      // proxy all requests starting with /api to jsonplaceholder
      '/proxy': {
        target: apiConfig['dev'],
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
