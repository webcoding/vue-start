
/**
 * 用于项目 API 环境切换
 * API 默认根据域名使用默认配置
 * 某特定位置按6下开启 debug 功能，可以设置切换 API
 */

const API = {
  dev: 'dev.iqianggou.com',
  beta: 'beta.iqianggou.com',
  alpha: 'alpha.iqianggou.com',
  staging: 'staging.iqianggou.com',
  prod: 'https://openapi.iqianggou.com',
  testing: '',
}

export default API

/**
 * 一些说明
 * 以 iqg 为例，常用的三个 API 环境
 * 如有新的 API 配置，必然新增了使用场景
 * 可以考虑独立出来
 * 即使很轻量，存在共存，只需列出，在 model 层配置即可
 *
 * 理论来说，不应该需要设置代理
 * 为什么，应该对本地开发开放设置
 * 比如：localhost|127.0.0.1|10.0|192.168 以及测试环境的域名等
 */
