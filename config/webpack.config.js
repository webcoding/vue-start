

function resolve (dir) {
  return path.join(__dirname, '../' + appDir + '/', dir)
}

...
  resolve: {
    extensions: ['.js', '.json', '.vue', '.css'],
    // 别名，便于引用并提高查找速度
    alias: {
      // 'vue$': 'vue/dist/vue.common.js',
      '$': resolve('../'),  // 指向编译配置 config 根目录
      '@': resolve('src'),  // 指向项目 src 目录
    }
  }
...
