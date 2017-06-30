// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import service from './services';
// import 'es6-promise/auto'
import { createApp } from './createApp'
import ProgressBar from './components/ProgressBar.vue'

// 1. Setting
// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

Vue.config.productionTip = false

// 2. Mixin

// 3. Plugins
// Vue.use({});

// 4. Model
// app.model(require('./models/example'));

// 5. Router
// app.router(require('./router'));

// 6. Initialize
// const { app, router, store } = createApp(App)

// 7. Start
// app.$mount('#app')


// ⚙️
// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to,
      }).then(next).catch(next)
    } else {
      next()
    }
  },
})

const { app, router, store } = createApp(App)

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        bar.finish()
        next()
      })
      .catch(next)
  })

  // actually mount to DOM
  app.$mount('#app')
})

const loginPath = '/login'
let logged
async function checkAuth() {
  // const res = await ajaxApi.checkLogin()
  // if (res.errno === 0) {
  //   logged = true
  // } else {
  //   console.log(res.errmsg)
  //   logged = false
  // }
  return logged
}

// 权限检测
router.beforeEach((to, from, next) => {
  const { meta, path } = to
  const { auth = false } = meta

  // if (to.matched.some(record => record.meta.requiresAuth)) {
  if (auth && path !== loginPath) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    checkAuth().then((logged) => {
      if (!logged) {
        return next({
          path: loginPath,
          query: { redirect: to.fullPath },
        })
      } else {
        next()
      }
    })
  } else {
    // 确保一定要调用 next()
    return next()
  }
})

// service worker
if (location.protocol === 'https' && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}

