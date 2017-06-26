# Vue-starter

Starter single page app with (vue2 + vue-router + vuex + webpack3)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Structure

```shell
├── dist           # 打包输出
├── config         # 打包编译配置
│   ├── env.js         # 打包环境变量
│   ├── project.js     # 项目相关
│   └── index.js       # 出口
│
├── src
│   ├── assets      # 静态资源
│   │   └── ...
│   ├── components  # 公共组件
│   ├── pages       # 页面
│   ├── router      # 路由
│   ├── services    # api 相关模块
│   │   └── mock        # 模拟数据
│   ├── setting     # 项目参数设置
│   ├── store       # vuex
│   ├── util        # 工具
│   ├── App.vue
│   ├── createApp.js
│   ├── main.js
│   └── index.template.html
│
├── test            # 只放配置文件，具体单元测试等文件，放在项目中（src 中）
├── static
│   ├── img
│   └── manifest.json
│
├── .xxxrc          # 各种开发配置
├── package.json
└── README.md
```
