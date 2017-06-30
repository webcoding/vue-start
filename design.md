# design

## 部分设计约定

- 开发的三个环境，本地开发dev、自动化测试 testing、其他全为生产prod
- 如需设置代理，配置独立参数 api，此配置可以有 local dev beta prod 等
- 注入全局变量 isDEV 等, 便于打包过滤
- 开发环境增设一个 debug 配置页面
  - 有一些快捷操作选项，常用调试手段
  - 可设置使用指定的 API 接口（也可以输入），默认跟域名相关
  - 也可以输入特定页面，进行跳转
- 生产环境保留无 debug 配置
  - 默认入口隐藏，通过点击8下某位置，唤起
  - 仅保留部分便捷操作选项，如提供退出登录等无后遗症调试手段
  - 如要全面调试，请使用仿真环境
- 自动化测试，使用默认的 API 接口（一般是 beta）
- 由于服务端是可以使用 history 模式渲染路由的，便于一致性测试，本地也要启用此模式来调试
- build
  - 暂时设计跟随项目的 build 编译工具（属于本项目）
  - 暂不考虑通用的 builder 编译工具（项目外，可多个项目共用）

## 关于命名

- 扩展名: Vue模块使用 .vue 扩展名。
- 文件名: 文件名使用帕斯卡命名。如, ItemList.vue。
- 引用命名: Vue模块名使用帕斯卡命名，实例使用骆驼式命名。
- 模块命名: 模块使用当前文件名一样的名称。但是，如果整个文件夹是一个模块，使用 index.js作为入口文件，然后直接文件夹名作为模块的名称。
- 高阶模块命名: 对于生成一个新的模块，其中的模块名 displayName 应该为高阶模块名和传入模块名的组合. 例如, 高阶模块 withFoo(), 当传入一个 Bar 模块的时候，生成的模块名 displayName 应该为 withFoo(Bar).
- 属性命名: 避免使用DOM相关的属性来用作其他的用途。
  - 对于style 和 className这样的属性名，我们都会默认它们代表一些特殊的含义，如元素的样式，CSS class的名称。
- 单引号还是双引号？属性值总是使用双引号("), 其他均使用单引号(').
- 属性名使用骆驼式风格camelCase。
- 不要给所谓的私有函数添加 _ 前缀，本质上它并不是私有的。

### 定义组件库格式

每个组件格式如下，每个组件资源放在vue-custom/packages/下组件同名的文件夹内

```
packages/ModulesName/
   |--- src/ 该组件相关实现
   |--- demo/ 该组件使用示例 demo
   |--- test/  该组件单元测试用例
   |--- index.js  入口文件
   |--- *.md  该组件相关说明等
```

帕斯卡格式命名，组件和文件名相同，统一具有出口文件 index.js

## 关于 build

打包编译，应该支持一个项目内单独打包多个目录

### 使用场景

- 小项目，使用 router 区分不同的业务项目
- 复杂项目，使用项目文件夹区分，单独打包输出，单独的配置等（相当于独立的，但几个独立的项目有一点相关性）
- 项目外支持，builder 支持打包项目外文件，只需配置对应项目的文件夹根路径即可（xxx/xxx，默认去找src 下的 main.js入口文件）

结合上述使用场景，builder 要支持通用配置，这个配置要放在项目中，只需指向项目目录，自动去加载项目配置，找到入口，打包类型等，即可打包

### 流程

1 执行命令（如`npm run dev`）
2 未配置路径，则当前目录下查找 config 配置（默认配置）
3 配置了路径，则在该路径下查找 config 配置
4 如果没有入口配置，入口约定为当前目录下的 ./src/index.js
5 将配置与基础配置merge 操作，然后继续执行命令

config 配置常用的设置有：

- 项目名称 默认 app
- 对应路径（通过当前配置相对路径获取）
- 输出目录（只配置路径，输出到项目根目录下 dist + 此设定的路径）
- 入口文件 如 src/index.js（相对于当前目录）
- cdn配置 如 七牛
- 变量别名 alias: {'@': './src', $: './'}
- 环境变量 env: dev,prod,testing
- 运行模式 mode: client,server
- 运行时类型 target: web,node,weex,hybrid
- 需要注入的变量，如 isDEV
- 运行服务的端口
- 加载器等

是否需要 api 配置用来设置代理？

代理设定需要加载设置，和项目内标准设置 export 格式还无法混用（解决方法总是有的 JSON 格式），可以和项目内的共享（项目内的 api列表，设置为非生产环境可切换），但具体制定哪个环境，运行时就确定的（代理设置），和项目内随意切换 api 环境不同。

https://github.com/xpepermint/vue-example

```js
// config
module.exports = {
  env: process.env.NODE_ENV || process.env.npm_package_config_env,
  locale: process.env.LOCALE || process.env.npm_package_config_locale,
  serverPort: process.env.SERVER_PORT || process.env.npm_package_config_serverPort,
  serverHost: process.env.SERVER_HOST || process.env.npm_package_config_serverHost,
  publicPath: process.env.PUBLIC_PATH || process.env.npm_package_config_publicPath,

  webpackServer () {
    return require('./webpack')(
      Object.assign({mode: 'server'}, module.exports)
    );
  },
  webpackClient () {
    return require('./webpack')(
      Object.assign({mode: 'client'}, module.exports)
    );
  }
};


// webpack
const {join} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

/*
* Generates a configuration object for Webpack.
*/

module.exports = function ({mode, env, publicPath}) {
  let isClient = mode === 'client';
  let isDev = env === 'development';

  return {
    context: join(__dirname, '..', 'src', 'app'),
    target: isClient ? 'web' : 'node',
    devtool: isDev ? '#source-map' : false,
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: !isDev ? {css: ExtractTextPlugin.extract({loader: `css-loader`})} : {}
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/ /* you must use .babelrc */
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: `[path][name].[ext]?[hash]`
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'file-loader',
          query: {
            name: `[path][name].[ext]?[hash]`
          }
        }
      ]
    },
    entry: [
      isClient ? 'babel-polyfill' : null,
      isClient && isDev ? 'webpack-hot-middleware/client' : null,
      join(__dirname, '..', 'src', 'app', `${mode}-entry.js`)
    ].filter((e) => !!e),
    output: {
      path: join(__dirname, '..', 'dist', mode),
      filename: `bundle.js?[hash]`,
      publicPath,
      libraryTarget: isClient ? 'var' : 'commonjs2'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
        'process.env.VUE_ENV': JSON.stringify(mode)
      }),
      new InlineEnviromentVariablesPlugin(),
      isDev ? new webpack.HotModuleReplacementPlugin() : null,
      isDev ? new webpack.NoEmitOnErrorsPlugin() : null,
      !isDev ? new ExtractTextPlugin(`bundle.css?[hash]`) : null,
      !isDev ? new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}) : null,
      !isDev ? new webpack.LoaderOptionsPlugin({minimize: true}) : null
    ].filter((e) => !!e)
  }
};


import {build} from 'vue-webpack';


const config = build({
  env: 'dev',       // prod testing
  mode: 'server',   // client
  target: 'web',    // hybrid node weex
  inputFilePath: './src/client/server-entry.js',
  outputFileName: 'bundle',
  outputPath: './dist'
}); // -> Webpack configuration object suitable for rendering Vue.js applications.
```
