# store

[结构划分](http://vuex.vuejs.org/zh-cn/structure.html)

```shell
├── api
│   └── ...     # 抽取出API请求
└── store
    ├── index.js        # 我们组装模块并导出 store 的地方
    ├── actions.js      # 根级别的 action
    ├── mutations.js    # 根级别的 mutation
    └── modules
      ├── cart.js       # 购物车模块
      └── products.js   # 产品模块
```
