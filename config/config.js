var path = require('path')

const apiConfig = require('./api.config')
const envConfig = require('./env.config')
const qnConfig = require('./qn.config')

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

const appName = 'app'

const project = {
  name: appName,
  dir: resolve('./'),
  dist: appName,
}

module.exports = {
  appName: project.name,
  appDir: project.dir,
  index: 'index.html', // 引用文件，相对于 assetsRoot
  template: project.dir + '/index.html',
  entry: '',
  alias: {
    '@': './src',
    $: './',
  },
  injectConst: {
    isDev: '',
  },
  prod: {
    env: envConfig['prod'],
    qnConfig: qnConfig,
    mode: 'client',
    target: 'web',
    // 无需编译的静态资源目录，会拷贝到 dist/assets 中
    staticPath: resolve(project.dir + '/src/assets'),
    // 编译输出，引用资源的注入
    index: resolve(project.dist + '/index.html'),
  },
  dev: {
    port: 8081,
    env: envConfig['dev'],
    mode: 'client',
    target: 'web',
    api: apiConfig['dev'],
  },
}
